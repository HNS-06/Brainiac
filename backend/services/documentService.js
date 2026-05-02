const { db } = require('../utils/firebase');
const pdf = require('pdf-parse');
const { generateEmbedding } = require('./geminiService');
const { upsertVectors } = require('./vectorService');
const { v4: uuidv4 } = require('uuid');

/**
 * Process uploaded document: Parse -> Chunk -> Embed -> Pinecone
 */
async function processDocument(file, userId) {
  try {
    if (!file || !file.buffer) {
      throw new Error(`File buffer is missing for ${file?.originalname || 'unknown file'}`);
    }

    let text = '';
    const mimeType = file.mimetype;
    
    // 1. Text Extraction based on MimeType
    try {
      if (mimeType === 'application/pdf') {
        const data = await pdf(file.buffer);
        text = data.text;
      } else if (mimeType === 'text/plain' || mimeType.startsWith('text/')) {
        text = file.buffer.toString('utf-8');
      } else {
        // Fallback for Office docs or binary: try to read as UTF-8 but warn
        console.warn(`Unsupported mimetype ${mimeType} for ${file.originalname}. Attempting UTF-8 read.`);
        text = file.buffer.toString('utf-8').replace(/[^\x20-\x7E\n\r]/g, ''); // Basic cleanup
      }
    } catch (parseErr) {
      console.error(`Parsing failed for ${file.originalname}:`, parseErr.message);
      throw new Error(`Could not read file content: ${parseErr.message}`);
    }

    if (!text || text.trim().length < 10) {
      throw new Error(`Extracted text is too short or empty for ${file.originalname}`);
    }

    const docId = uuidv4();
    const chunks = chunkText(text, 800, 100); 
    console.log(`Processing ${chunks.length} chunks for ${file.originalname}. docId: ${docId}`);

    const vectors = [];
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      let embedding;
      try {
        // AI Embedding with individual try-catch
        embedding = await generateEmbedding(chunk);
        if (i === 0) console.log(`[AI] Embedding dimension for ${file.originalname}: ${embedding.length}`);
      } catch (embErr) {
        console.warn(`[AI] Skipping chunk ${i} due to embedding failure:`, embErr.message);
        continue; // Skip failed chunk rather than crashing whole file
      }
      
      vectors.push({
        id: `${docId}_chunk_${i}`,
        values: embedding,
        metadata: {
          text: chunk,
          userId: userId,
          docId: docId,
          title: file.originalname,
          timestamp: new Date().toISOString()
        }
      });
    }

    // 2. Vector Indexing (Non-critical fallback)
    if (vectors.length > 0) {
      try {
        console.log(`[Pinecone] Upserting ${vectors.length} vectors for doc: ${docId}`);
        await upsertVectors(vectors, userId);
      } catch (ve) {
        console.error('[Pinecone] Vector indexing failed:', ve.message);
        // We continue because metadata in Firestore is still valuable
      }
    }

    // 3. AI Key Map Generation (Non-critical fallback)
    let keyMapResult = { topics: [], subtopics: [], relationships: [] };
    try {
      const { generateInsights } = require('./geminiService');
      console.log(`[AI] Generating knowledge map for ${file.originalname}`);
      keyMapResult = await generateInsights(
        [file.originalname], 
        `Extract a structured knowledge map from this text: "${text.substring(0, 4000)}". Format as JSON with topics, subtopics, and relationships.`
      );
    } catch (ie) {
      console.warn('[AI] Insight generation failed, using empty map.');
    }

    // 4. Firestore Persistence
    try {
      console.log(`[Firestore] Saving document metadata: ${docId}`);
      await db.collection('documents').doc(docId).set({
        id: docId,
        name: file.originalname,
        type: mimeType,
        userId: userId,
        uploadedAt: new Date().toISOString(),
        chunkCount: chunks.length,
        keyMap: keyMapResult,
        status: 'processed'
      });

      await db.collection('history').add({
        userId,
        type: 'UPLOAD',
        title: `Ingested ${file.originalname}`,
        timestamp: new Date().toISOString(),
        details: { docId }
      });
    } catch (fsErr) {
      console.error('[Firestore] Metadata save failed:', fsErr.message);
      throw new Error(`Database save failed: ${fsErr.message}`);
    }

    return docId;
  } catch (error) {
    console.error(`[Service] Document ${file.originalname} processing error:`, error.message);
    throw error;
  }
}

/**
 * Simple character-based chunking
 */
function chunkText(text, size, overlap) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    let end = start + size;
    chunks.push(text.slice(start, end));
    start = end - overlap;
  }
  return chunks;
}

module.exports = { processDocument };
