const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');


const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routers');
const rideRoutes = require('./routes/ride.routes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Example route
app.get('/', (req, res) => {
  res.send('Hello Welcome to Roatify!');
});


// Routes
app.use('/api/users', userRoutes);
app.use('/api/captions', captainRoutes);
app.use('/api/maps', mapsRoutes);
app.use('/api/rides', rideRoutes);


// Error handler
app.use(errorHandler);


module.exports = app;
