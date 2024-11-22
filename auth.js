const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db-config');
const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.query(query, [email, hashedPassword], (err) => {
    if (err) return res.status(500).send('Error registering user');
    res.send('User registered successfully');
  });
});

// User Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).send('Error logging in');
    if (results.length === 0) return res.status(404).send('User not found');

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send('Invalid credentials');

    res.send('Login successful');
  });
});

module.exports = router;
