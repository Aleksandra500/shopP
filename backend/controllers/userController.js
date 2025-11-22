
const db = require('../db');
const bcrypt = require('bcryptjs');
const signToken = require('../utils/signToken');

exports.register = (req, res, next) => {
  const usersData = req.body;

  if (!usersData.role) {
    usersData.role = 'admin';
  }

  const q = 'SELECT * FROM users WHERE email = ? OR username = ?';

  db.query(q, [usersData.email, usersData.username], (err, data) => {
    if (err) {
      console.error('❌ Greška pri proveri korisnika:', err);
      return res.status(500).json({ message: 'Greška u serveru' });
    }

    if (data.length > 0) {
      return res.status(400).json({ message: '❌ User already exists' });
    }

    // Hash lozinke
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(usersData.password, salt);

    const sql = 'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)';
    const values = [usersData.username, hash, usersData.email, usersData.role];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('❌ Greška pri dodavanju korisnika:', err);
        return res.status(500).json({ message: 'Greška u serveru' });
      }

      return res.status(200).json({
        status: 'success',
        message: 'Uspešno dodat user',
      });
    });
  });
};

exports.login = (req, res) => {
  const usersData = req.body;

  const q = 'SELECT * FROM users WHERE email = ?';

  db.query(q, [usersData.email], (err, data) => {
    if (err) {
      console.error('❌ Greška pri proveri korisnika:', err);
      return res.status(500).json({ message: 'Greška u serveru' });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = data[0];

    if (!user.password) {
      return res.status(500).json({ message: 'Server error: no password found' });
    }

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('✅ User successfully logged in:', user.username);
    const {password, name, id, ...userData} = user
  
    const token = signToken(user.id);
   
    

    return res.status(200).json({
      status: 'success',
      message: 'Uspešno ste ulogovani',
      user: userData,
      token
    });
  });
};
