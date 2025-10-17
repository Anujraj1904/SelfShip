const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  userId: { type: Number },                  
  vehicleType: { type: String },             
  capacity: { type: Number },                
  cargoTypes: { type: String },               
  available: { type: Boolean, default: true }, 
  location: { type: String }                  
}, { timestamps: true }); 

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
