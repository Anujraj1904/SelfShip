const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/createOrder', protect, createOrder);
router.get('/getOrder', protect, getOrders);

module.exports = router;
