const mysql = require('mysql2');
require("dotenv").config();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD, 
    database: "shopP"
});

db.connect((err) => {
    if (err) {
        console.error('❌ Greška pri konekciji sa bazom:', err.message);
    } else {
        console.log('✅ Uspostavljena konekcija sa MySQL bazom!');
    }
});

module.exports = db;