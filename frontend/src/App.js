// App.js
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  // Use environment variable for API URL
  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch jokes on component mount
  useEffect(() => {
    fetch(`${API_URL}/jokes`)
      .then((res) => res.json())
      .then((data) => {
        setJokes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching jokes2:', err);
        setLoading(false);
      });
  }, [API_URL]);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadStatus('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploadStatus('Uploading...');

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setUploadStatus(`✅ ${result.message} (File: ${result.filename})`);
        setFile(null); // Clear selected file
      } else {
        setUploadStatus(`❌ ${result.message || 'Upload failed'}`);
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      setUploadStatus('❌ Error uploading file');
    }
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>Welcome to React App Test Muraly New CICD Pipeline Test</h1>

      {/* File Upload Section */}
      <div style={{ margin: '20px 0' }}>
        <h2>Upload a File</h2>
        <form onSubmit={handleUpload}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit" style={{ marginLeft: '10px' }}>Upload</button>
        </form>
        {uploadStatus && <p style={{ marginTop: '10px' }}>{uploadStatus}</p>}
      </div>

      {/* Jokes Table */}
      {loading ? (
        <p>Loading jokes...</p>
      ) : jokes.length === 0 ? (
        <p>No jokes found.</p>
      ) : (
        <center>
          <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {jokes.map((joke, index) => (
                <tr key={index}>
                  <td>{joke.title}</td>
                  <td>{joke.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </center>
      )}
    </div>
  );
}

export default App;