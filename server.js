// server.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

app.post('/submit', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }

    // Process the form data (e.g., send email, save to database, etc.)

    res.json({ success: true });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
