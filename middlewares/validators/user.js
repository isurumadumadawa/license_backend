const { body } = require("express-validator");

const { User, Role } = require("../../models");
const createUserValidationRules = [
  body("userName")
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
  body("password").isLength({ min: 5 }),
  body("roleId")
    .isNumeric()
    .notEmpty()
    .custom(async (value) => {
      const role = await Role.findOne({
        where: { id: value },
      });
      if (!role) {
        return Promise.reject("Invalid role id");
      }
    }),
];

module.exports = {
  createUserValidationRules,
};
