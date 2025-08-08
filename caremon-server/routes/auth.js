const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Mock validation
  if (email && password === 'password') {
    return res.json({
      token: 'mock-token-123',
      user: { email }
    });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
