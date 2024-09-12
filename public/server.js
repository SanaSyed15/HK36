const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Setup middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            email TEXT,
            password TEXT
        )
    `);

    db.run(`
        CREATE TABLE profiles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            firstName TEXT,
            lastName TEXT,
            dob DATE,
            age INTEGER,
            gender TEXT,
            country TEXT,
            city TEXT,
            phone TEXT,
            email TEXT,
            linkedin TEXT,
            website TEXT,
            education TEXT,
            institution TEXT,
            FOREIGN KEY (userId) REFERENCES users(id)
        )
    `);
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle signup
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    const stmt = db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
    stmt.run(username, email, password, function(err) {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving user.');
        } else {
            res.sendStatus(200);
        }
    });
    stmt.finalize();
});

// Handle profile creation
app.post('/create-profile', (req, res) => {
    const { firstName, lastName, dob, age, gender, country, city, phone, email, linkedin, website, education, institution } = req.body;

    // Assume user ID is 1 for this example
    const userId = 1;

    const stmt = db.prepare(`
        INSERT INTO profiles (userId, firstName, lastName, dob, age, gender, country, city, phone, email, linkedin, website, education, institution)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(userId, firstName, lastName, dob, age, gender, country, city, phone, email, linkedin, website, education, institution, function(err) {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving profile.');
        } else {
            res.sendStatus(200);
        }
    });
    stmt.finalize();
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
