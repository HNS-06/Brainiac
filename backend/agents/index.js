const { getModel } = require('../utils/gemini');

const summarizerAgent = async (text) => {
  const model = getModel();
  const prompt = `Summarize the following text concisely while retaining key insights:\n\n${text}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
};

const verifierAgent = async (claim, context) => {
  const model = getModel();
  const prompt = `Verify if the following claim is supported by the context provided.\nClaim: ${claim}\nContext: ${context}\n\nRespond with "VERIFIED" or "UNVERIFIED" and a brief explanation.`;
  const result = await model.generateContent(prompt);
  return result.response.text();
};

const plannerAgent = async (complexQuery) => {
  const model = getModel();
  const prompt = `Break down this complex user request into a step-by-step plan for other AI agents to execute:\n\n${complexQuery}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
};

const insightAgent = async (userData) => {
  const model = getModel();
  const prompt = `Based on the following user activity and knowledge base metadata, provide 3 proactive insights or learning suggestions:\n\n${JSON.stringify(userData)}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
};

module.exports = {
  summarizerAgent,
  verifierAgent,
  plannerAgent,
  insightAgent
};
