const express = require('express');
const { login, register } = require('../controllers/authController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.post('/register', authMiddleware, adminMiddleware, register);

module.exports = router;
