const express = require('express');
const router = express.Router();
const { auth } = require('../utils/firebase');

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await auth.createUser({
      email,
      password,
    });
    res.json({ message: 'User created successfully', uid: userRecord.uid });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { idToken } = req.body;
    const decodedToken = await auth.verifyIdToken(idToken);
    res.json({ message: 'Login successful', uid: decodedToken.uid });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
