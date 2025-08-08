// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const generateRoute = require('./routes/generate');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route for generating the cover letter
app.use('/generate', generateRoute);

// Health check
app.get('/', (req, res) => res.send('Cover Letter AI backend is running.'));

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
