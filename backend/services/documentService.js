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
    let text = '';
    if (file.mimetype === 'application/pdf') {
      const data = await pdf(file.buffer);
      text = data.text;
    } else {
      text = file.buffer.toString('utf-8');
    }

    const docId = uuidv4();
    const chunks = chunkText(text, 500, 50); // ~500 tokens/chars with overlap

    const vectors = [];
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const embedding = await generateEmbedding(chunk);
      
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

    // 2. Generate AI Key Map (Topics, Subtopics, Relationships)
    const { generateInsights } = require('./geminiService');
    const keyMapResult = await generateInsights([file.originalname], `Extract a structured knowledge map from this text: "${text.substring(0, 5000)}". Format as JSON with topics, subtopics, and relationships.`);

    // 3. Store metadata in Firestore for listing
    await db.collection('documents').doc(docId).set({
      id: docId,
      name: file.originalname,
      type: file.mimetype,
      userId: userId,
      uploadedAt: new Date().toISOString(),
      chunkCount: chunks.length,
      keyMap: keyMapResult
    });

    // 4. Log to history
    await db.collection('history').add({
      userId,
      type: 'UPLOAD',
      title: `Uploaded ${file.originalname}`,
      timestamp: new Date().toISOString(),
      details: { docId }
    });

    return docId;
  } catch (error) {
    console.error('Document processing error:', error);
    throw error;
  }
}

/**
 * Simple character-based chunking (for demo, real implementation would use token-based)
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
