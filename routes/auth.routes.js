const express = require('express');
const router = express.Router();

// Import Controllers
const { registerUser, loginUser, adminMiddleware, googleAuth, facebookAuth } = require('../controllers/auth.controllers')

// Local Auth
router.post('/signup', registerUser)
router.post('/signin', loginUser)

// Google & Facebook Auth
router.post('/google-loggin', googleAuth);
router.post('/facebook-loggin', facebookAuth);

module.exports = router