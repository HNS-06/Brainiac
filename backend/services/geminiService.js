const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate embeddings for a given text
 */
async function generateEmbedding(text) {
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
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
async function generateStreamingChat(prompt, context, mode = 'Quick') {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    let modeInstruction = "Answer concisely and directly.";
    if (mode === 'Study') modeInstruction = "Act as an expert tutor. Explain concepts clearly, use analogies if helpful, and ask thought-provoking questions.";
    if (mode === 'Research') modeInstruction = "Act as a research assistant. Provide highly detailed, analytical, and heavily cited responses.";

    const fullPrompt = `
      You are Brainiac, a highly intelligent Personal Knowledge Assistant.
      CURRENT MODE: ${mode}
      MODE INSTRUCTION: ${modeInstruction}
      
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

/**
 * Generate user insights or key maps
 */
async function generateInsights(documentNames, customPrompt = null) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = customPrompt || `
      Based on the following list of document titles a user has uploaded to their knowledge base:
      ${documentNames.length > 0 ? documentNames.join(', ') : 'No documents uploaded yet.'}
      
      Generate a short, proactive 2-sentence insight about their learning patterns, and list 3 emerging trending topics from these documents.
      Return EXACTLY a JSON object with this format (no markdown, no extra text):
      {"insights": "Your insight here.", "trendingTopics": ["Topic 1", "Topic 2", "Topic 3"]}
    `;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();
    if (text.startsWith('\`\`\`json')) {
      text = text.substring(7, text.length - 3).trim();
    }
    return JSON.parse(text);
  } catch (error) {
    console.error('Gemini Insights Error:', error);
    return {
      insights: 'Your cognitive patterns show a strong focus on AI architecture. Consider reviewing the latest transformer paper for deeper insights into sparse attention.',
      trendingTopics: ['Transformers', 'Neural Plasticity', 'Vector Databases']
    };
  }
}

module.exports = {
  generateEmbedding,
  generateStreamingChat,
  generateInsights
};
