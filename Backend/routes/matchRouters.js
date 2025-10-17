const express = require('express');
const { matchOrder } = require('../controllers/matchController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/driverMatch', protect, matchOrder);

module.exports = router;
