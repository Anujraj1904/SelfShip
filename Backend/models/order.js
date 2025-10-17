const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  shipperId: { type: Number },             // Integer field equivalent
  pickupLocation: { type: String },
  deliveryLocation: { type: String },
  cargoType: { type: String },
  weight: { type: Number },
  price: { type: Number },
  status: { type: String, default: 'pending' }, // default value like Sequelize
}, { timestamps: true }); // adds createdAt and updatedAt automatically

// Create the 'Order' model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
