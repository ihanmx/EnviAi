const express = require('express');
const { handleImageRequest } = require('../controllers/openaiController');
const multer = require('multer');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Configure multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Limit files to 10MB
    },
    fileFilter: (req, file, cb) => {
        // Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    },
});

// Apply rate limiting to the /image route
const imageLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes.',
});

// route to handle image generation and editing
router.post('/image', imageLimiter, upload.single('image'), handleImageRequest);

module.exports = router;
