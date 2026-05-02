const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getModel = (modelName = 'gemini-1.5-flash') => {
  return genAI.getGenerativeModel({ model: modelName });
};

module.exports = { genAI, getModel };
