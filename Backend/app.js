const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorHandler');


const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRouters');
const matchRoutes = require('./routes/matchRouters');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/match', matchRoutes);


// Error handler
app.use(errorHandler);

// Example route
app.get('/', (req, res) => {
  res.send('Hello from Express app.js!');
});

module.exports = app;
