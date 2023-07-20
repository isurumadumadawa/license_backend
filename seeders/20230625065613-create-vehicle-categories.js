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
      "vehicles",
      [
        {
          id: 1,
          name: "Motorcycles without gears (up to 100cc)",
          category: "A1",
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 2,
          name: "Motorcycles with gears (above 100cc)",
          category: "A",
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 3,
          name: "Three-wheelers (tuk-tuks)",
          category: "B1",
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 4,
          name: "Light vehicles, including cars, vans, and dual-purpose vehicles",
          category: "B",
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 5,
          name: "Light trucks (with a gross vehicle weight rating up to 3,500 kg)",
          category: "C1",
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 6,
          name: "Medium and heavy trucks",
          category: "C",
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 7,
          name: "Medium and heavy construction machinery",
          category: "CE",
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 8,
          name: "Buses with a seating capacity of 17 or more passengers",
          category: "D1",
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 9,
          name: "Buses with a seating capacity of more than 17 passengers",
          category: "D",
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 10,
          name: "Articulated buses or vehicles with trailers",
          category: "DE",
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 11,
          name: "Motorized tricycles used for goods transportation",
          category: "G1",
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 12,
          name: "Road rollers and other construction machinery",
          category: "G",
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 13,
          name: "Special-purpose vehicles",
          category: "J",
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
  },
};
