const { body } = require("express-validator");

const loginValidationRules = [
  body("userName", "User Name is Required!").isString().notEmpty(),
  body("password", "Password is Required!")
    .isLength({ min: 5 })
    .isString()
    .notEmpty(),
];

const driverLoginValidationRules = [
  body("mobileNumber", "Required Valid Mobile Number!")
    .isString()
    .notEmpty()
    .isLength({ min: 10, max: 10 }),
];

const changePasswordValidationRules = [
  body("userName", "User Name is Required!").isString().notEmpty(),
  body("password", "Password is Required!")
    .isLength({ min: 5 })
    .isString()
    .notEmpty(),
  body("newPassword", "New Password is Required!")
    .isLength({ min: 5 })
    .isString()
    .notEmpty(),
];

module.exports = {
  loginValidationRules,
  driverLoginValidationRules,
  changePasswordValidationRules,
};
