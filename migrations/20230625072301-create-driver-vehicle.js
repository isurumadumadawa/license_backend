"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("driver_vehicle", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      driverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vehicleId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      issuedDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      expireDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("driver_vehicle");
  },
};
