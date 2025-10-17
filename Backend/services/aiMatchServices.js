const Driver = require('../models/Driver');
const Order = require('../models/Order');

exports.matchDrivers = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error('Order not found');

  const { cargoType } = order;
  const drivers = await Driver.find({ available: true });

  // Filter drivers that can carry this cargo
  const suitableDrivers = drivers.filter(d =>
    d.cargoTypes.includes(cargoType)
  );

  // Return top 5 drivers (replace with distance logic later if needed)
  return suitableDrivers.slice(0, 5);
};
