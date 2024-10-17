import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to access passed state
import axios from "axios"; // To handle requests to the backend

const DesignWithAIPage = () => {
  const location = useLocation(); // Get the location object
  const productType = location.state?.productType; // Retrieve product type from state

  const [prompt, setPrompt] = useState(""); // To store the user input
  const [imageUrls, setImageUrls] = useState([]); // To store the generated image URLs
  const [loading, setLoading] = useState(false); // To show a loader when image is generating
  const [error, setError] = useState(""); // To show any errors

  // Function to handle image generation
  const handleGenerateImages = async () => {
    if (!prompt) {
      setError("Prompt cannot be empty!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/generate-images",
        {
          prompt: `A ${productType} with the text '${prompt}' printed on it.`,
        }
      );

      if (response.data.imageUrls) {
        setImageUrls(response.data.imageUrls);
      }
    } catch (err) {
      setError("Error generating images. Please try again.");
    } finally {
      setLoading(false);
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
        onClick={handleGenerateImages}
        disabled={loading}
        style={{ padding: "10px 20px", marginBottom: "10px" }}
      >
        {loading ? "Generating..." : "Generate Images"}
      </button>

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display the generated images */}
      {imageUrls.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Generated Images:</h3>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Generated ${index + 1}`}
                style={{ maxWidth: "30%", height: "auto", margin: "10px" }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignWithAIPage;
