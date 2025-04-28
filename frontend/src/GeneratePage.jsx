import { useState } from "react";
import axios from "axios";

export default function GeneratePage() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const generateShortUrl = async () => {
    if (!longUrl) {
      setError("Please enter a valid URL");
      return;
    }

    try {
      
      const response = await axios.post(
        "http://localhost:8000/api/shorten", 
        { long_url: longUrl }
      );

      setShortUrl(response.data.short_url); 
      setError(""); 
    } catch (error) {
      setError("Failed to generate short URL");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Generate Short URL</h1>

       
        {error && <p className="error-message">{error}</p>}

        <input
          type="text"
          placeholder="Enter long URL"
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button
          className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600"
          onClick={generateShortUrl}
        >
          Generate
        </button>

        {shortUrl && (
          <div className="mt-6">
            <p className="text-gray-700">Short URL:</p>
            <a
              href={shortUrl}
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
