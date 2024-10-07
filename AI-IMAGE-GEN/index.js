const express = require('express');
const dotenv = require('dotenv');
const openaiRoutes = require('./routes/openaiRoutes');
const path = require('path');
const cors = require('cors');

dotenv.config(); // Load environment variables

console.log('OpenAI API Key:', process.env.OPENAI_API_KEY);

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Enable CORS if frontend is hosted separately
app.use(cors());

// Serve static files from the 'public' directory (for frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Use the OpenAI routes
app.use('/api', openaiRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
