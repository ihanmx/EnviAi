const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config(); // Load environment variables from .env

const app = express();
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON requests

const PORT = process.env.PORT || 4000; // Use PORT from env, or default to 5000

// Function to generate images using OpenAI API
async function generateImages(prompt) {
  const apiKey = process.env.OPENAI_API_KEY5; // Make sure to set your OpenAI API key

  const url = "https://api.openai.com/v1/images/generations";

  const requestBody = {
    prompt: prompt,
    model: "dall-e-2", // or "dall-e-3" if you prefer
    n: 1, // Number of images to generate (1-10)
    response_format: "url", // Optional, can be 'url' or 'b64_json'
    size: "1024x1024", // Optional, specify size of the image
  };

  try {
    const response = await axios.post(url, requestBody, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    // Return the image URLs from the response
    return response.data.data.map((image) => image.url);
  } catch (error) {
    console.error(
      "Error generating images:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to generate images");
  }
}

// Endpoint to handle image generation requests
app.post("/generate-images", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const imageUrls = await generateImages(prompt); // Call the function to generate images
    res.json({ imageUrls }); // Send the generated image URLs back to the client
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
