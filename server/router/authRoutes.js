const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const authJWT = require('../middleware/authJWT');

// register manual
router.post('/register', authController.register);

// login manual
router.post('/login', authController.login)

// login google
router.post('/google-login', authController.googleLogin)

// auth jwt
router.get('/protected', authJWT, (req, res) => {
  res.json({ message: 'Ini data rahasia untuk user dengan id ' + req.userId });
});

module.exports = router;