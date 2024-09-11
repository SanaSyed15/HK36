const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the signup page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Route to handle signup form submission
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // Example validation (implement your own logic)
    if (!username || !password) {
        return res.status(400).send('All fields are required!');
    }

    // Simulate user registration success
    console.log('New user registered: ${username}');

    // Redirect to the profile creation page after successful signup
    res.redirect('/profile');
});

// Route to serve the profile creation page
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log('Server running on http://localhost:${PORT}');
});