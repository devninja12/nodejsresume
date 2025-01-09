// server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // To serve static files like index.html
const bodyParser = require('body-parser');

// Initialize app
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files (like index.html) from the root directory (same folder as server.js)
app.use(express.static(path.join(__dirname, '../frontend')));

// MongoDB connection (use your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/test/')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.log("Failed to connect to MongoDB:", err);
    });

// Add route to handle the root path (`/`)
app.get('/', (req, res) => {
    // Serve the index.html file from the root directory
    res.sendFile(path.join(__dirname, '../frontend', 'index.html')); // This assumes index.html is in the same directory as server.js
});

// Handle email form submission
app.post('/submit-email', (req, res) => {
    const email = req.body.email;

    // Save email to MongoDB using the Email model
    const Email = require('./models/emailModel'); // Ensure this points to your models directory correctly

    const newEmail = new Email({ email });

    newEmail.save()
        .then(() => {
            res.status(200).send({ message: 'Thank you for submitting your email!' });
        })
        .catch((err) => {
            res.status(400).send({ message: 'Error saving email.' });
            console.error(err);
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
