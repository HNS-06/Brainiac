const Groq = require('groq-sdk');
const dotenv = require('dotenv');
dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function generateStreamingChatGroq(prompt, context, mode = 'Quick') {
  try {
    let modeInstruction = "Answer concisely and directly.";
    if (mode === 'Study') modeInstruction = "Act as an expert tutor. Explain concepts clearly, use analogies if helpful, and ask thought-provoking questions.";
    if (mode === 'Research') modeInstruction = "Act as a research assistant. Provide highly detailed, analytical, and heavily cited responses.";

    const systemPrompt = `
      You are Brainiac, a highly intelligent Personal Knowledge Assistant.
      CURRENT MODE: ${mode}
      MODE INSTRUCTION: ${modeInstruction}
      
      CONTEXT FROM USER'S KNOWLEDGE BASE:
      ${context}
      
      INSTRUCTIONS:
      1. Answer the question ONLY using the provided context.
      2. If the answer is not in the context, say "I don't have this information in your knowledge base."
      3. Cite sources if document names are provided in the context.
      4. Use a professional, helpful tone.
    `;

    const stream = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      model: 'llama3-8b-8192',
      stream: true,
    });

    return stream;
  } catch (error) {
    console.error('Groq Streaming Error:', error);
    throw new Error('Failed to generate streaming response from Groq');
  }
}

module.exports = {
  generateStreamingChatGroq
};
