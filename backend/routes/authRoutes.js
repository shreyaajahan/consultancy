const express = require('express');
const router = express.Router();
const { login, getProfile, createAdmin } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.post('/login', login);
router.post('/create-admin', createAdmin); // Use once to create admin, then disable

// Protected routes
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
