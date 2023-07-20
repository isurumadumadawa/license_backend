"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Driver, DriverVehicle }) {
      // define association here
      this.belongsToMany(Driver, {
        through: DriverVehicle,
        foreignKey: "vehicleId",
        as: "drivers",
      });
    }
  }
  Vehicle.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Vehicle must have a name" },
          notEmpty: { msg: "Name must not be empty" },
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Vehicle must have a category" },
          notEmpty: { msg: "Category must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "vehicles",
      modelName: "Vehicle",
    }
  );
  return Vehicle;
};
