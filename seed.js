const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./greetings.db'); 

//seed data
const greetings = [
    { timeOfDay: 'morning', language: 'English', tone: 'Formal', greetingMessage: 'Good Morning!' },
    { timeOfDay: 'morning', language: 'English', tone: 'Casual', greetingMessage: 'Morning!' },
    { timeOfDay: 'afternoon', language: 'English', tone: 'Formal', greetingMessage: 'Good Afternoon!' },
    { timeOfDay: 'afternoon', language: 'English', tone: 'Casual', greetingMessage: 'Afternoon!' },
    { timeOfDay: 'evening', language: 'English', tone: 'Formal', greetingMessage: 'Good Evening!' },
    { timeOfDay: 'evening', language: 'English', tone: 'Casual', greetingMessage: 'Evening!' },

    { timeOfDay: 'morning', language: 'French', tone: 'Formal', greetingMessage: 'Bonjour!' },
    { timeOfDay: 'morning', language: 'French', tone: 'Casual', greetingMessage: 'Salut!' },
    { timeOfDay: 'afternoon', language: 'French', tone: 'Formal', greetingMessage: 'Bon Après-midi!' },
    { timeOfDay: 'afternoon', language: 'French', tone: 'Casual', greetingMessage: 'Salut!' },
    { timeOfDay: 'evening', language: 'French', tone: 'Formal', greetingMessage: 'Bonsoir!' },
    { timeOfDay: 'evening', language: 'French', tone: 'Casual', greetingMessage: 'Salut!' },

    { timeOfDay: 'morning', language: 'Spanish', tone: 'Formal', greetingMessage: '¡Buenos días!' },
    { timeOfDay: 'morning', language: 'Spanish', tone: 'Casual', greetingMessage: '¡Hola!' },
    { timeOfDay: 'afternoon', language: 'Spanish', tone: 'Formal', greetingMessage: '¡Buenas tardes!' },
    { timeOfDay: 'afternoon', language: 'Spanish', tone: 'Casual', greetingMessage: '¡Buenas!' },
    { timeOfDay: 'evening', language: 'Spanish', tone: 'Formal', greetingMessage: '¡Buenas noches!' },
    { timeOfDay: 'evening', language: 'Spanish', tone: 'Casual', greetingMessage: '¡Hola!' },


];

// seed data into the database
greetings.forEach(greeting => {
    db.run(
        `INSERT INTO Greetings (timeOfDay, language, tone, greetingMessage) VALUES (?, ?, ?, ?)`,
        [greeting.timeOfDay, greeting.language, greeting.tone, greeting.greetingMessage],
        (err) => {
            if (err) {
                console.error('Error inserting data:', err);
            } else {
                console.log('Inserted greeting:', greeting);
            }
        }
    );
});

// Close the database connection
db.close();