const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// GET Method Endpoint for /bfhl
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 'OP12345' });
});

// POST Method Endpoint for /bfhl
app.post('/bfhl', (req, res) => {
    const { userId, collegeEmail, collegeRollNumber, inputArray } = req.body;

    // Separate numbers and alphabets from inputArray
    const numbers = inputArray.filter(item => !isNaN(item));
    const alphabets = inputArray.filter(item => isNaN(item));

    // Find the highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(ch => ch === ch.toLowerCase());
    const highestLowercase = lowercaseAlphabets.length ? lowercaseAlphabets.sort().pop() : null;

    // Return the response as JSON
    res.json({
        status: 'success',
        userId: userId,
        collegeEmail: collegeEmail,
        collegeRollNumber: collegeRollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highestLowercase: highestLowercase
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
