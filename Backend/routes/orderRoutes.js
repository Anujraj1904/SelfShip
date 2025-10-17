const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, getOrders);

module.exports = router;
