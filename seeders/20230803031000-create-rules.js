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
      "rules",
      [
        {
          id: 1,
          name: "Driving without a valid fitness certificate",
          penalty: 4000,
          score: 4,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 2,
          name: "Driving without registration",
          penalty: 10000,
          score: 10,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 3,
          name: "Driving without a license",
          penalty: 10000,
          score: 10,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 4,
          name: "Driving without insurance",
          penalty: 20000,
          score: 20,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 5,
          name: "Driving with wrong number plates",
          penalty: 10000,
          score: 10,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 6,
          name: "Electric in the driver’s line of sight running between the driver",
          penalty: 10000,
          score: 10,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 7,
          name: "Using the device",
          penalty: 10000,
          score: 10,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 8,
          name: "Smoking marijuana while driving",
          penalty: 10000,
          score: 10,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 9,
          name: "Using the car regardless of the terms of the license",
          penalty: 30000,
          score: 30,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 10,
          name: "Driving without a driver’s license or license without plates",
          penalty: 5000,
          score: 5,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 11,
          name: "Driving without a license or driver’s license",
          penalty: 2000,
          score: 2,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 12,
          name: "Allowing to drive without a license or permit",
          penalty: 15000,
          score: 15,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 13,
          name: "Not having license or driver’s license when stopped",
          penalty: 10000,
          score: 10,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 14,
          name: "Reckless driving without accident",
          penalty: 11000,
          score: 11,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 15,
          name: "Car collision by careless driving",
          penalty: 25000,
          score: 25,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 16,
          name: "Driving without seat belt",
          penalty: 2000,
          score: 2,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 17,
          name: "Traveling with passengers without wearing seat belts",
          penalty: 2000,
          score: 2,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 18,
          name: "Honking in silent zones",
          penalty: 5000,
          score: 2,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 19,
          name: "Traveling with a person driving under the influence",
          penalty: 12000,
          score: 12,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 20,
          name: "Failure to obey traffic signs",
          penalty: 10000,
          score: 10,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 21,
          name: "Failure to drive to the left when overtaking a vehicle",
          penalty: 5000,
          score: 5,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 22,
          name: "Overtaking on the left",
          penalty: 5000,
          score: 5,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 23,
          name: "Not allowing other overtaking vehicles to pass",
          penalty: 5000,
          score: 5,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 24,
          name: "Driving from the station obstructing the road",
          penalty: 4000,
          score: 4,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 25,
          name: "Overtaking where the road is not visible",
          penalty: 9000,
          score: 9,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 26,
          name: "Driving back more than two vehicle lengths to turn",
          penalty: 3000,
          score: 3,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 27,
          name: "Exceeding the speed limit by 16-32 km / h",
          penalty: 12000,
          score: 12,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 28,
          name: "Exceeding the speed limit by 33-49 km",
          penalty: 20000,
          score: 20,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 29,
          name: "Exceeding the speed limit by 50 km or more",
          penalty: 30000,
          score: 30,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 30,
          name: "Failure to obey traffic signal",
          penalty: 10000,
          score: 10,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 31,
          name: "Non-compliance with traffic control sign",
          penalty: 12000,
          score: 12,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 32,
          name: "Obstructing the free passage of the vehicle",
          penalty: 5000,
          score: 5,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 33,
          name: "Using mobile phone or other electronic device while driving",
          penalty: 10000,
          score: 10,
          createdAt: "2023-06-19 16:03:44",
          updatedAt: "2023-06-19 16:03:44",
        },
        {
          id: 34,
          name: "Keeping an electronic device between the driver",
          penalty: 10000,
          score: 10,
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
