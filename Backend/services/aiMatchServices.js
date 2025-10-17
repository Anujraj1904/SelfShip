const Driver = require('../models/Driver');
const Order = require('../models/Order');

// Simple rule-based AI matching
exports.matchDrivers = async (orderId) => {
  const order = await Order.findByPk(orderId);
  if (!order) throw new Error('Order not found');

  const { cargoType } = order;
  const drivers = await Driver.findAll({ where: { available: true } });

  // Filter drivers that can carry this cargo
  const suitableDrivers = drivers.filter(d =>
    d.cargoTypes.includes(cargoType)
  );

  // Return top 5 drivers (you can replace this with distance-based later)
  return suitableDrivers.slice(0, 5);
};
