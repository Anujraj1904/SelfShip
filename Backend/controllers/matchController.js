const { matchDrivers } = require('../services/aiMatchServices');

exports.matchOrder = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const matches = await matchDrivers(orderId);
    res.json({ success: true, matches });
  } catch (err) {
    next(err);
  }
};
