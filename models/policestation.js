"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PoliceStation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Panelty }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId", as: "credintials" });
      this.hasMany(Panelty, {
        foreignKey: "policeStationId",
        as: "policeArea",
      });
    }
    toJSON() {
      return {
        ...this.get(),
      };
    }
  }
  PoliceStation.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Police station must have a name" },
          notEmpty: { msg: "Name must not be empty" },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Police station must have a city" },
          notEmpty: { msg: "City must not be empty" },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Police station must have a user id" },
          notEmpty: { msg: "User id must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "police_stations",
      modelName: "PoliceStation",
    }
  );
  return PoliceStation;
};
