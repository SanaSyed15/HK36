// indexserver.js
const express = require('express');
const bodyParser = require('body-parser');
const { User, Profile } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('./config/database');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// User signup route
app.post('/signup', async (req, res) => {
    const { Username, Email, Password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(Password, 10);
        const user = await User.create({ Username, Email, PasswordHash: hashedPassword });
        res.status(201).json({ UserID: user.UserID });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});

// User profile creation route
app.post('/profile', async (req, res) => {
    const { UserID, FirstName, LastName, DateOfBirth, Gender, City, Country, Email, PhoneNumber, LinkedInProfile, EducationalQualification, Institution } = req.body;
    try {
        const profile = await Profile.create({ UserID, FirstName, LastName, DateOfBirth, Gender, City, Country, Email, PhoneNumber, LinkedInProfile, EducationalQualification, Institution });
        res.status(201).json({ ProfileID: profile.ProfileID });
    } catch (error) {
        res.status(500).json({ error: 'Error creating profile' });
    }
});

// Synchronize models with SQLite database
sequelize.sync({ force: true })
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Error syncing database', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});