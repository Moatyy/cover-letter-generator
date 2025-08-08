// backend/testAI.js
require('dotenv').config();
const { generateCoverLetter } = require('./services/aiClient');

(async () => {
  try {
    const samplePrompt = "Write a formal cover letter for a Software Engineer position at Acme Corp. Experience: 5 years Java.";
    const result = await generateCoverLetter(samplePrompt);
    console.log("AI Response:\n", result);
  } catch (e) {
    console.error("AI Error:", e.response?.data || e.message);
  }
})();
