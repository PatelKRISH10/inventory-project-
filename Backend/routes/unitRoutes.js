const express = require('express');
const { getAllUnits } = require('../controllers/unitController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, getAllUnits);

module.exports = router;
