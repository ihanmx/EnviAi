const { OpenAIApi, Configuration } = require('openai');
const FormData = require('form-data');
const axios = require('axios');


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// to handle image generation and editing
const handleImageRequest = async (req, res) => {
    try {
        const prompt = req.body.prompt;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                error: 'No text prompt provided.',
            });
        }

        if (req.file) {
            // *Image Editing Workflow*
            const imageBuffer = req.file.buffer;
            const imageBase64 = imageBuffer.toString('base64');

            const payload = {
                image: imageBase64,
                prompt: prompt,
                n: 10, 
                size: "1024x1024",
            };

            const response = await openai.createImageEdit(payload);

            const editedImageUrls = response.data.data.map(image => image.url); 

            res.status(200).json({
                success: true,
                data: editedImageUrls,
            });

        } else {
            // *Image Generation Workflow*

            const response = await openai.createImage({
                model: "dall-e-3",
                prompt: prompt,
                n: 10,
                size: "1024x1024",
            });

            const imageUrls = response.data.data.map(image => image.url);

            res.status(200).json({
                success: true,
                data: imageUrls,
            });
        }
    } catch (error) {
        console.error('Error handling image request:', error);

        let errorMessage = 'The image could not be processed. Please try again later.';

        if (error.response && error.response.data) {
            const status = error.response.status;
            if (status === 429) {
                errorMessage = 'Rate limit exceeded. Please try again later.';
            } else if (status === 400) {
                errorMessage = 'Invalid request. Please check your inputs.';
            } else if (error.response.data.error) {
                errorMessage = error.response.data.error;
            }
        } else if (error.message) {
            errorMessage = error.message;
        }

        res.status(500).json({
            success: false,
            error: errorMessage,
        });
    }
};


module.exports = { handleImageRequest };
