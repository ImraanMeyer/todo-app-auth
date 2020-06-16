const express = require('express');
const router = express.Router();

// Import Controllers
const { requireSignin, adminMiddleware } = require('../controllers/auth.controllers');
const { read, update } = require('../controllers/user.controllers');

// Import Validators
router.get('/user/:id', requireSignin, read);
router.put('/user/update', requireSignin, update);
router.put('/admin/update', requireSignin, adminMiddleware, update);

module.exports = router;