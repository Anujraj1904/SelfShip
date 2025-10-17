const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: { type: Number },                   
  amount: { type: Number },                     
  method: { type: String },                     
  status: { type: String, default: 'pending' }, 
  stripeIntentId: { type: String }              
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
