const captainModel = require('../models/captain.js');

module.exports.createCaptain = async({
  firstname, lastname, email, password, plate, capacity, vehicleType }) => {
  if (!firstname || !lastname || !email || !password || !plate || !capacity || !vehicleType){
    throw new Error('All fields are required');
  }
  const captain = captainModel.create({
    fullname: {firstname, lastname},
    email,
    password,
    vehicle: {
      plate,
      capacity,
      vehicleType
    }
  })
  return captain;
}
