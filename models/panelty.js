"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Panelty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Panelty, PaneltyRule, Driver, Vehicle, PoliceStation }) {
      this.belongsToMany(Panelty, {
        through: PaneltyRule,
        foreignKey: "panelty",
        as: "panelties",
      });
      this.belongsTo(Driver, { foreignKey: "driverId", as: "driver" });
      this.belongsTo(Vehicle, { foreignKey: "vehicleType", as: "vehicle" });
      this.belongsTo(PoliceStation, {
        foreignKey: "policeStation",
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
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "Panelty must have a driver id" },
          notEmpty: { msg: "Driver id must not be empty" },
        },
      },
      vehicleType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Panelty must have a vehicle id" },
          notEmpty: { msg: "Vehicle id must not be empty" },
        },
      },
      policeStation: {
        type: DataTypes.UUID,
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
    },
    {
      sequelize,
      tableName: "panelties",
      modelName: "Panelty",
    }
  );
  return Panelty;
};
