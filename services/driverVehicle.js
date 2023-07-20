const { DriverVehicle } = require("../models");

const createDriverVehicle = async ({
  driverId,
  vehicleId,
  issuedDate,
  expireDate,
}) => {
  return await DriverVehicle.create({
    driverId,
    vehicleId,
    issuedDate,
    expireDate,
  });
};

module.exports = {
  createDriverVehicle,
};
