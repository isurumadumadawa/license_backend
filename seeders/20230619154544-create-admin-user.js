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
      "users",
      [
        {
          id: 1,
          uuid: "ebb07dba-5c78-4423-b38c-1eb66b7da1b6",
          userName: "admin",
          roleId: 1,
          password:
            "$2b$10$jPBhRtaT3I1fCAMGfXrBb.siMGHJ.U/Q7kS7PlASMbjrxxAJzDg5C",
          salt: "$2b$10$jPBhRtaT3I1fCAMGfXrBb.",
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
    await queryInterface.bulkDelete("users", null, {});
  },
};
