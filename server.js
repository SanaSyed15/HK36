
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (for profile-success.html)
app.use(express.static(path.join(__dirname, 'public')));

// POST route to handle form submission
app.post('/create-profile', (req, res) => {
    const profileData = req.body;
    // Process the profile data (e.g., save to database)
    
    // Redirect to success page after processing
    res.redirect('/profile-success.html');
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

