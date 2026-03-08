const express = require('express');
const { getAllUsers, deleteUser, updateUserPassword } = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, adminMiddleware, getAllUsers);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);
router.put('/:id/password', authMiddleware, adminMiddleware, updateUserPassword);

module.exports = router;
