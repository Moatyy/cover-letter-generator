// backend/services/resumeParser.js

const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

/**
 * Parses a resume file (PDF or DOCX) and returns its text content.
 * @param {string} filePath - The path to the uploaded file.
 * @returns {Promise<string>} - The extracted text.
 */
async function parseResume(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  // Read the file into a buffer
  const fileBuffer = fs.readFileSync(filePath);

  if (ext === '.pdf') {
    // PDF parsing
    const data = await pdfParse(fileBuffer);
    return data.text;
  } 
  else if (ext === '.doc' || ext === '.docx') {
    // DOCX parsing
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    return result.value;
  } 
  else {
    throw new Error('Unsupported file type: ' + ext);
  }
}

module.exports = { parseResume };
