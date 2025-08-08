// backend/routes/generate.js

const express  = require('express');
const router   = express.Router();
const fs       = require('fs');
const path     = require('path');
const multer   = require('multer');
const upload   = multer({ storage: multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename:    (req, file, cb) => {
    const ext  = path.extname(file.originalname).toLowerCase();
    const name = path.basename(file.originalname, ext).replace(/\s+/g, '_');
    cb(null, `${name}-${Date.now()}${ext}`);
  }
})});

const { parseResume }        = require('../services/resumeParser');
const { generateCoverLetter } = require('../services/aiClient');

router.post('/', upload.single('resume'), async (req, res) => {
  try {
    // 1. Parse resume
    const resumeText = await parseResume(req.file.path);
    fs.unlinkSync(req.file.path);

    // 2. Collect other inputs
    const { jobTitle, company, jobDescription, tone } = req.body;

    // 3. Build the prompt
    const prompt = `
Write a ${tone} cover letter for a candidate applying to ${jobTitle} at ${company}.
Use the following job description:
${jobDescription}

Here is the candidate's resume:
${resumeText}
    `.trim();

    // 4. Call Azure Foundry
    const letter = await generateCoverLetter(prompt);

    // 5. Return the result
    return res.json({ coverLetter: letter });
  } catch (err) {
    console.error('Error in /generate:', err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
