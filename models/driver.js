"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Vehicle, DriverVehicle, Panelty }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId", as: "credintials" });
      this.belongsToMany(Vehicle, {
        through: DriverVehicle,
        foreignKey: "driverId",
        as: "vehicles",
      });
      this.hasMany(Panelty, { foreignKey: "driverId", as: "panelty" });
    }
    toJSON() {
      return {
        ...this.get(),
      };
    }
  }
  Driver.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Driver must have a name" },
          notEmpty: { msg: "Name must not be empty" },
        },
      },
      otherName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Driver must have a birth day" },
          notEmpty: { msg: "Birth day must not be empty" },
        },
      },
      mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Driver must have a mobile number" },
          notEmpty: { msg: "Mobile number must not be empty" },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Driver must have a gender" },
          notEmpty: { msg: "Gender must not be empty" },
        },
      },
      bloodType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Driver must have a blood type" },
          notEmpty: { msg: "Blood type must not be empty" },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Driver must have a address" },
          notEmpty: { msg: "Address must not be empty" },
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
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Driver must have a imge" },
          notEmpty: { msg: "Image must not be empty" },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Driver must have a user id" },
          notEmpty: { msg: "User id must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "drivers",
      modelName: "Driver",
    }
  );
  return Driver;
};
