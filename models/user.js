"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Role, Driver, PoliceOfficer, PoliceStation }) {
      // define association here
      this.belongsTo(Role, { foreignKey: "roleId", as: "role" });
      this.hasOne(Driver, { foreignKey: "userId", as: "driver" });
      this.hasOne(PoliceOfficer, { foreignKey: "userId", as: "policeOfficer" });
      this.hasOne(PoliceStation, { foreignKey: "userId", as: "policeStation" });
      this.hasOne(PoliceOfficer, {
        foreignKey: "policeStationId",
        as: "policeStationData",
      });
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
      };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "User must have a user name" },
          notEmpty: { msg: "User name must not be empty" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a password" },
          notEmpty: { msg: "Pasword must not be empty" },
        },
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a salt" },
          notEmpty: { msg: "Salt must not be empty" },
        },
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a role id" },
          notEmpty: { msg: "Role id must not be empty" },
          isInt: { msg: "Role id must not be a number" },
        },
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );

  return User;
};
