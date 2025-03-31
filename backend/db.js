const mysql = require('mysql2');
require('dotenv').config(); // Učitavanje .env varijabli

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "my_sql_pass",
    database: process.env.DB_NAME || "test"
});

db.connect((err) => {
    if (err) {
        console.error('❌ Greška pri konekciji sa bazom:', err.message);
    } else {
        console.log('✅ Uspostavljena konekcija sa MySQL bazom!');
    }
});

module.exports = db;