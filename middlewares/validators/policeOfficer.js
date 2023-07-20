const { body, param } = require("express-validator");

const { User } = require("../../models");
const createPoliceOfficerValidationRules = [
  body("userName", "Required Valid User Name!")
    .isString()
    .notEmpty()
    .custom(async (value) => {
      const user = await User.findOne({
        where: { userName: value },
      });
      if (user) {
        return Promise.reject("User name already in use");
      }
    }),
  body("policeStationId", "Required Valid Police Station Id!")
    .isString()
    .notEmpty()
    .custom(async (value) => {
      const policeStation = await User.findOne({
        where: { uuid: value },
      });
      if (!policeStation) {
        return Promise.reject("Required Police Station Id!");
      }
    }),
  body("name", "Required Valid Name!").isString().notEmpty(),
  body("rank", "Required Valid Rank!").isString().notEmpty(),
  body("password", "Required Valid Password!").isLength({ min: 5 }),
];

const getPoliceOfficerValidationRules = [
  param("uuid", "User Id id Required!")
    .isString()
    .notEmpty()
    .custom(async (value) => {
      const user = await User.findOne({
        where: { uuid: value },
      });
      if (!user) {
        return Promise.reject("User Not Found");
      }
    }),
];

module.exports = {
  createPoliceOfficerValidationRules,
  getPoliceOfficerValidationRules,
};
