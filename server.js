const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000; // You can change the port if needed

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (CSS, JS, images) directly from the root directory
app.use(express.static(path.join(__dirname)));

// Endpoint to handle form submission
app.post('/submit-email', (req, res) => {
    const email = req.body.email;
    if (email) {
        console.log('Email submitted:', email);
        res.status(200).send({ message: 'Thank you for submitting your email!' });
    } else {
        res.status(400).send({ message: 'Error: Please provide a valid email address.' });
    }
});

// Route for the root URL ('/')
app.get('/', (req, res) => {
    // Serve the index.html file located in the same directory
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
