const express = require('express');
const multer = require('multer');
const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');
require('dotenv').config(); // Load environment variables

const app = express();
const upload = multer({ dest: 'uploads/' }); // Directory for uploaded files

app.use(express.json());

app.post('/generate-image', upload.single('image'), async (req, res) => {
    const { prompt } = req.body;
    const { type, extractedPrompt } = extractProductType(prompt);
    let generatedImageUrls = [];

    try {
        if (req.file) {
            // Handle image upload
            generatedImageUrls = await generateImagesFromProductType(type); // First endpoint
            const modifiedImageUrls = await Promise.all(generatedImageUrls.map(async (url) => {
                return await modifyImageWithUpload(url, req.file.path); // Second endpoint
            }));
            return res.status(200).json({ imageUrls: modifiedImageUrls }); // Return multiple modified URLs
        } else {
            // Handle prompt only
            generatedImageUrls = await generateImages(extractedPrompt); // Directly generate images
            return res.status(200).json({ imageUrls: generatedImageUrls }); // Return multiple URLs
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error generating images. Please try again.' });
    }
});

// Function to generate multiple images based on a prompt
const generateImages = async (prompt) => {
    const apiKey = process.env.OPENAI_API_KEY5; // Use your OpenAI API key
    const url = "https://api.openai.com/v1/images/generations";

    const requestBody = {
        prompt: prompt,
        model: "dall-e-2",
        n: 5, // Request 5 images
        size: "1024x1024"
    };

    console.log("Request Body:", requestBody); // Debugging line

    try {
        const response = await axios.post(url, requestBody, {
            headers: {
                Authorization: `Bearer ${apiKey}`, // Use template literals for the Authorization header
                "Content-Type": "application/json",
            },
        });
        return response.data.data.map(image => image.url); // Return an array of generated image URLs
    } catch (error) {
        console.error('Error generating images:', error.response ? error.response.data : error.message);
        throw new Error('Failed to generate images');
    }
};

// Function to generate multiple images based on product type
const generateImagesFromProductType = async (productType) => {
    const prompt = `A beautiful image of a ${productType}`; // Customize the prompt based on product type
    return await generateImages(prompt);
};

// Function to create a mask from the uploaded image
const createMask = async (uploadedImagePath) => {
    const maskPath = './uploads/mask.png';
    await sharp(uploadedImagePath)
        .threshold(128) // Create a binary mask based on brightness
        .toFile(maskPath);
    return maskPath; // Return the path of the created mask
};

// Function to modify the generated image using the uploaded image as a mask
const modifyImageWithUpload = async (generatedImageUrl, uploadedImagePath) => {
    try {
        const maskPath = await createMask(uploadedImagePath); // Create the mask

        const apiKey = process.env.OPENAI_API_KEY5; // Use your OpenAI API key
        const url = "https://api.openai.com/v1/images/edits"; // Adjusted endpoint for editing images

        const response = await axios.post(url, {
            image: fs.createReadStream(generatedImageUrl), // Original image
 mask: fs.createReadStream(maskPath), // Mask image
            prompt: "Overlay the uploaded image onto the generated image",
            n: 1,
            size: "1024x1024"
        }, {
            headers: {
                Authorization: `Bearer ${apiKey}`, // Use template literals for the Authorization header
                "Content-Type": "application/json",
            },
        });

        return response.data.data[0].url; // Return the modified image URL
    } catch (error) {
        console.error('Error modifying image:', error.response ? error.response.data : error.message);
        throw new Error('Failed to modify image');
    }
};

// Dummy function to extract product type from the prompt
const extractProductType = (prompt) => {
    const regex = /Create a front view of an image of (.*) with a '(.*)' image printed on it./;
    const match = prompt.match(regex);
    if (match) {
        return { type: match[1], extractedPrompt: match[2] };
    } else {
        throw new Error('Failed to extract product type and prompt');
    }
};

app.listen(4000, () => {
    console.log('Server started on port 4000');
});