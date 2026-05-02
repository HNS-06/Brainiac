const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate embeddings for a given text
 */
async function generateEmbedding(text) {
  try {
    const model = genAI.getGenerativeModel({ model: "embedding-001" });
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error('Gemini Embedding Error:', error);
    throw new Error('Failed to generate embedding');
  }
}

/**
 * Generate streaming completion with context
 */
async function generateStreamingChat(prompt, context) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const fullPrompt = `
      You are Brainiac, a highly intelligent Personal Knowledge Assistant.
      
      CONTEXT FROM USER'S KNOWLEDGE BASE:
      ${context}
      
      USER QUESTION:
      ${prompt}
      
      INSTRUCTIONS:
      1. Answer the question ONLY using the provided context.
      2. If the answer is not in the context, say "I don't have this information in your knowledge base."
      3. Cite sources if document names are provided in the context.
      4. Use a professional, helpful tone.
      5. Format your response with clear sections: "Answer" and "Sources" (if applicable).
    `;

    const result = await model.generateContentStream(fullPrompt);
    return result.stream;
  } catch (error) {
    console.error('Gemini Streaming Error:', error);
    throw new Error('Failed to generate streaming response');
  }
}

module.exports = {
  generateEmbedding,
  generateStreamingChat
};
