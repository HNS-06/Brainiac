const { Pinecone } = require('@pinecone-database/pinecone');
const dotenv = require('dotenv');

dotenv.config();

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
});

const indexName = process.env.PINECONE_INDEX || 'brainiac';

/**
 * Upsert vectors to Pinecone
 */
async function upsertVectors(vectors, userId) {
  try {
    console.log(`Upserting ${vectors.length} vectors to index: ${indexName}, namespace: ${userId}`);
    const index = pc.index(indexName).namespace(userId);
    await index.upsert(vectors);
  } catch (error) {
    console.error('Pinecone Upsert Error:', error.message);
    if (error.message.includes('404')) {
      console.error(`FATAL: Pinecone index "${indexName}" not found. Please create it in your Pinecone console.`);
    }
    throw new Error(`Failed to store vectors in Pinecone: ${error.message}`);
  }
}

/**
 * Query Pinecone for similar context
 */
async function queryVectors(queryEmbedding, userId, topK = 5) {
  try {
    const index = pc.index(indexName).namespace(userId);
    const queryResponse = await index.query({
      vector: queryEmbedding,
      topK,
      includeMetadata: true,
    });
    
    return queryResponse.matches.map(match => ({
      text: match.metadata.text,
      docId: match.metadata.docId,
      title: match.metadata.title,
      score: match.score
    }));
  } catch (error) {
    console.error('Pinecone Query Error:', error);
    throw new Error('Failed to retrieve context from Pinecone');
  }
}

/**
 * Delete all vectors for a user (Wipe Cortex feature)
 */
async function deleteUserVectors(userId) {
  try {
    const index = pc.index(indexName).namespace(userId);
    await index.deleteAll();
  } catch (error) {
    console.error('Pinecone Delete Error:', error);
    throw new Error('Failed to wipe user vectors');
  }
}

module.exports = {
  upsertVectors,
  queryVectors,
  deleteUserVectors
};
