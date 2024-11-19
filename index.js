//Mevan Herathnayake
//2024-11-18

const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./greetings.db');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Greet Endpoint
app.post('/greet', (req, res) => {
    const { timeOfDay, language, tone } = req.body;
    db.get(
        `SELECT greetingMessage FROM Greetings WHERE timeOfDay = ? AND language = ? AND tone = ?`,
        [timeOfDay, language, tone],
        (err, row) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
            } else if (row) {
                res.json({ greetingMessage: row.greetingMessage });
            } else {
                res.status(404).json({ error: 'Greeting not found' });
            }
        }
    );
});

// Get Times of Day
app.get('/times_of_day', (req, res) => {
    console.log("Received request for times-of-day");
    db.all(`SELECT DISTINCT timeOfDay FROM Greetings`, [], (err, rows) => {
        if (err) {
            console.error('Error fetching times of day:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(rows.map(row => row.timeOfDay));
        }
    });
});

// Get Languages
app.get('/languages', (req, res) => {
    db.all(`SELECT DISTINCT language FROM Greetings`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(rows.map(row => row.language));
        }
    });
});

