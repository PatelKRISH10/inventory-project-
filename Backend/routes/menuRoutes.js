const express = require('express');
const { getMenu, updateMenu } = require('../controllers/menuController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, getMenu);
router.put('/', authMiddleware, adminMiddleware, updateMenu);

module.exports = router;
