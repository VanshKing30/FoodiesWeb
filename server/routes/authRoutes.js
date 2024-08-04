const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateAuth = require('../middleware/validateAuth');

// Route for user registration
router.post('/register', authController.registerUser);

// Route for user login
router.post('/login', authController.loginUser);

// Route for user logout (if applicable)
router.post('/logout', validateAuth, authController.logoutUser);

// Route for password reset
router.post('/forgot-password', authController.forgotPassword);

// Route for password reset confirmation
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;
