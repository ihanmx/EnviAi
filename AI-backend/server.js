const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config(); // Load environment variables from .env

const app = express();
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON requests

const PORT = process.env.PORT || 5000; // Use PORT from env, or default to 5000

// Function to generate image using OpenAI API
async function generateImage(prompt) {
  const apiKey = process.env.OPENAI_API_KEY_1;

  const url = "https://api.openai.com/v1/images/generations";

  const requestBody = {
    prompt: prompt,
    model: "dall-e-3", // Optional, defaults to 'dall-e-2'
    n: 1, // Optional, number of images to generate (1-10)
    quality: "standard", // Optional, use 'hd' for higher quality (only for dall-e-3)
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

    // Return the image URL from the response
    return response.data.data[0].url; // Adjust based on actual response structure
  } catch (error) {
    console.error(
      "Error generating image:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to generate image");
  }
}

// Endpoint to handle image generation requests
app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const imageUrl = await generateImage(prompt); // Call the function to generate image
    res.json({ imageUrl }); // Send the generated image URL back to the client
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
