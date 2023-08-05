"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Panelty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ PaneltyRule, Driver, Vehicle, PoliceStation, Rule }) {
      this.belongsToMany(Rule, {
        through: PaneltyRule,
        foreignKey: "paneltyId",
        as: "panelties",
      });
      this.belongsTo(Driver, { foreignKey: "driverId", as: "driver" });
      this.belongsTo(Vehicle, { foreignKey: "vehicleId", as: "vehicle" });
      this.belongsTo(PoliceStation, {
        foreignKey: "policeStationId",
        as: "policeArea",
      });
    }
  }
  Panelty.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      driverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Panelty must have a driver id" },
          notEmpty: { msg: "Driver id must not be empty" },
        },
      },
      vehicleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Panelty must have a vehicle id" },
          notEmpty: { msg: "Vehicle id must not be empty" },
        },
      },
      policeStationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Panelty must have a police station" },
          notEmpty: { msg: "Police station must not be empty" },
        },
      },
      isClosed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isCourt: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: { msg: "Panelty must have a isCourt" },
          notEmpty: { msg: "isCourt must not be empty" },
        },
      },
      issuedDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Panelty must have a issued date" },
          notEmpty: { msg: "Issued date must not be empty" },
        },
      },
      expireDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Panelty must have a expire date" },
          notEmpty: { msg: "expire date must not be empty" },
        },
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: "panelties",
      modelName: "Panelty",
    }
  );
  return Panelty;
};
