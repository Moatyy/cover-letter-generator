import React, { useState } from 'react';
import './App.css';

function App() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [tone, setTone] = useState("formal");
  const [resumeFile, setResumeFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!resumeFile) {
      alert("Please upload your resume.");
      return;
    }

    console.log("Submitted:", {
      jobTitle,
      company,
      jobDescription,
      tone,
      resumeFile
    });

    // Future: send to Azure Foundry or backend
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  return (
    <div className="container">
      <h1>AI Cover Letter Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <textarea
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
        />
        <select value={tone} onChange={(e) => setTone(e.target.value)}>
          <option value="formal">Formal</option>
          <option value="friendly">Friendly</option>
          <option value="confident">Confident</option>
        </select>

        <label style={{ marginTop: '15px', display: 'block' }}>
          Upload Resume (PDF or DOCX):
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          required
        />

        <button type="submit">Generate</button>
      </form>
    </div>
  );
}

export default App;
