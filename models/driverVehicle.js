"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DriverVehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Driver, Vehicle }) {
      // define association here
      this.belongsTo(Driver, { foreignKey: "driverId", as: "driver" });
      this.belongsTo(Vehicle, { foreignKey: "vehicleId", as: "vehicle" });
    }
  }
  DriverVehicle.init(
    {
      driverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a driver id" },
          notEmpty: { msg: "Driver id must not be empty" },
          isInt: { msg: "Driver id must not be a number" },
        },
      },
      vehicleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a vehicle id" },
          notEmpty: { msg: "Vehicle id must not be empty" },
          isInt: { msg: "Vehicle id must not be a number" },
        },
      },
      issuedDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Driver must have a issued date" },
          notEmpty: { msg: "Issued date must not be empty" },
        },
      },
      expireDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Driver must have a expire date" },
          notEmpty: { msg: "expire date must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "driver_vehicle",
      modelName: "DriverVehicle",
    }
  );
  return DriverVehicle;
};
