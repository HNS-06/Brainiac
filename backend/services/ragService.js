const { generateEmbedding } = require('./geminiService');
const { generateStreamingChatGroq } = require('./groqService');
const { queryVectors } = require('./vectorService');

/**
 * Perform RAG with streaming support
 */
async function performStreamingRAG(query, userId, mode = 'Quick') {
  try {
    // 1. Generate query embedding
    const queryEmbedding = await generateEmbedding(query);

    // 2. Retrieve relevant context from Pinecone
    const contextMatches = await queryVectors(queryEmbedding, userId);
    
    // 3. Format context for Gemini
    const contextText = contextMatches
      .map(match => `[Source: ${match.title}] ${match.text}`)
      .join('\n\n');

    // 4. Generate streaming response (using Groq for ultra-fast Llama 3)
    const stream = await generateStreamingChatGroq(query, contextText, mode);
    
    return {
      stream,
      sources: contextMatches.map(m => ({ title: m.title, docId: m.docId }))
    };
  } catch (error) {
    console.error('Streaming RAG Error:', error);
    throw error;
  }
}

/**
 * Static RAG (legacy support or internal use)
 */
async function performRAG(query, userId) {
  const result = await performStreamingRAG(query, userId);
  let fullText = '';
  for await (const chunk of result.stream) {
    fullText += chunk.text();
  }
  return {
    answer: fullText,
    sources: result.sources
  };
}

module.exports = {
  performStreamingRAG,
  performRAG
};
