"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          id: 1,
          role: "admin",
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 2,
          role: "motor-vehicle-department",
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 3,
          role: "police-officer",
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 4,
          role: "police-station",
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 5,
          role: "driver",
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("roles", null, {});
  },
};
