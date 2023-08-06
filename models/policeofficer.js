"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PoliceOfficer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Panelty }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId", as: "credintials" });
      this.hasMany(Panelty, { foreignKey: "policeOfficerId", as: "panelties" });
    }
    toJSON() {
      return {
        ...this.get(),
      };
    }
  }
  PoliceOfficer.init(
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
          notNull: { msg: "Police officer must have a name" },
          notEmpty: { msg: "Name must not be empty" },
        },
      },
      rank: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Police officer must have a name" },
          notEmpty: { msg: "Name must not be empty" },
        },
      },
      policeStationId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "Police officer must have a police station id" },
          notEmpty: { msg: "Police station id must not be empty" },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Police officer must have a user id" },
          notEmpty: { msg: "User id must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "police_officers",
      modelName: "PoliceOfficer",
    }
  );
  return PoliceOfficer;
};
