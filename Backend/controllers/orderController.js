const Order = require('../models/Order');

exports.createOrder = async (req, res, next) => {
  try {
    const { pickupLocation, deliveryLocation, cargoType, weight, price } = req.body;
    const order = await Order.create({
      shipperId: req.user.id,
      pickupLocation,
      deliveryLocation,
      cargoType,
      weight,
      price,
    });
    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json({ success: true, orders });
  } catch (err) {
    next(err);
  }
};
