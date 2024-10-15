import React, { useState } from "react";
import axios from "axios"; // To handle requests to the backend

const DesignWithAIPage = () => {
  const [prompt, setPrompt] = useState(""); // To store the user input
  const [imageUrl, setImageUrl] = useState(""); // To store the generated image URL
  const [loading, setLoading] = useState(false); // To show a loader when image is generating
  const [error, setError] = useState(""); // To show any errors

  // Function to handle the image generation
  const handleGenerateImage = async () => {
    if (!prompt) {
      setError("Prompt cannot be empty!");
      return;
    }

    setLoading(true); // Set loading state
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(
        "http://localhost:5000/generate-image",
        {
          prompt: prompt,
        }
      );

      if (response.data.imageUrl) {
        setImageUrl(response.data.imageUrl); // Set the generated image URL
      }
    } catch (err) {
      setError("Error generating image. Please try again.");
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="App" style={{ textAlign: "center", padding: "20px" }}>
      <h1>AI Image Generator</h1>
      {/* Input field for the prompt */}
      <input
        type="text"
        placeholder="Enter a description..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ padding: "10px", width: "80%", marginBottom: "10px" }}
      />
      <br />

      {/* Button to generate the image */}
      <button
        onClick={handleGenerateImage}
        disabled={loading}
        style={{ padding: "10px 20px", marginBottom: "10px" }}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display the generated image */}
      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <h3>Generated Image:</h3>
          <img
            src={imageUrl}
            alt="Generated"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};

export default DesignWithAIPage;
