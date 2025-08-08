// backend/services/aiClient.js
require('dotenv').config();
const axios = require('axios');

const ENDPOINT   = process.env.AZURE_ENDPOINT;
const API_KEY    = process.env.AZURE_API_KEY;
const DEPLOYMENT = process.env.AZURE_DEPLOYMENT_NAME;

async function generateCoverLetter(prompt) {
  const url = `${ENDPOINT}/models/chat/completions?api-version=2024-05-01-preview`;
  console.log("🚀 URL:", url);
  console.log("🔑 Key loaded:", !!API_KEY);
  console.log("📦 Deployment:", DEPLOYMENT);

  const body = {
    model: DEPLOYMENT,
    messages: [
      { role: 'system', content: 'You are a professional AI assistant...' },
      { role: 'user',   content: prompt }
    ],
    max_tokens: 500,
    temperature: 0.7
  };

  const res = await axios.post(url, body, {
    headers: { 'Content-Type': 'application/json', 'api-key': API_KEY }
  });
  return res.data.choices[0].message.content.trim();
}

module.exports = { generateCoverLetter };
