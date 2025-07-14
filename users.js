const express = require('express');
const router = express.Router();

// In-memory user database
let users = [];

// REGISTER new user
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (users.find(u => u.username === username)) {
    return res.status(409).send('User already exists');
  }

  users.push({ username, password });
  res.send('User registered successfully');
});

// LOGIN
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.send('Login successful');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

module.exports = router;
