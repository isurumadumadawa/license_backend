const { body, param } = require("express-validator");

const { User } = require("../../models");
const createDMTOfficerValidationRules = [
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
  body("password", "Required Valid Password!").isLength({ min: 5 }),
];

const getDMTOfficerValidationRules = [
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
  createDMTOfficerValidationRules,
  getDMTOfficerValidationRules,
};
