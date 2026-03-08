const express = require('express');
const { adjustStock, getTransactionHistory } = require('../controllers/stockTransactionController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/adjust', authMiddleware, adjustStock);
router.get('/history/:item_id', authMiddleware, getTransactionHistory);

module.exports = router;
