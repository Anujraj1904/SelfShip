const { createPaymentIntent } = require('../services/paymentServices');
const Payment = require('../models/Payment');

exports.createPayment = async (req, res, next) => {
  try {
    const { orderId, amount } = req.body;
    const clientSecret = await createPaymentIntent(amount, orderId);
    const payment = await Payment.create({ orderId, amount, method: 'card', stripeIntentId: clientSecret });
    res.json({ success: true, clientSecret, payment });
  } catch (err) {
    next(err);
  }
};