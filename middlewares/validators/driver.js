const { body, param } = require("express-validator");

const { User, Driver } = require("../../models");
const createDriverValidationRules = [
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
  body("name", "Required Valid Name!").isString().notEmpty(),
  body("otherName", "Required Valid Other Name!").isString().notEmpty(),
  body("mobileNumber", "Required Valid Mobile Number!")
    .isString()
    .notEmpty()
    .isLength({ min: 10, max: 10 }),
  body("gender", "Required Valid Gender!").isString().notEmpty(),
  body("bloodType", "Required Valid Blood Type!").isString().notEmpty(),
  body("address", "Required Valid Address!").isString().notEmpty(),
  body("dob", "Required Valid Date of Birth!")
    .isString()
    .notEmpty()
    .isISO8601(),
  body("image", "Required Valid Image URL!")
    .isString()
    .notEmpty()
    .isURL({ require_protocol: true }),
  body("issuedDate", "Required Valid Issued Date!")
    .isString()
    .notEmpty()
    .isISO8601(),
  body("expireDate", "Required Valid Expiry Date!")
    .isString()
    .notEmpty()
    .isISO8601(),
  body("vehicles")
    .isArray({ min: 1 })
    .withMessage("At least one vehicle must be provided"),
  body("vehicles.*.issuedDate", "Required Valid Vehicle Issued Date!")
    .isString()
    .notEmpty()
    .isISO8601(),
  body("vehicles.*.expireDate", "Required Valid Vehicle Expiry Date!")
    .isString()
    .notEmpty()
    .isISO8601(),
  body("vehicles.*.vehicleId", "Required Valid Vehicle ID!")
    .isInt({ min: 1 })
    .withMessage("Vehicle ID must be a positive integer"),
];

const getDriverValidationRules = [
  param("uuid", "User Id id Required!")
    .isString()
    .notEmpty()
    .custom(async (value) => {
      const user = await Driver.findOne({
        where: { uuid: value },
      });
      if (!user) {
        return Promise.reject("User Not Found");
      }
    }),
];

const getDriverByMobileValidationRules = [
  param("mobileNumber", "Required Valid Mobile Number!")
    .isString()
    .notEmpty()
    .isLength({ min: 10, max: 10 })
    .custom(async (value) => {
      const user = await Driver.findOne({
        where: { mobileNumber: value },
      });
      if (!user) {
        return Promise.reject("User Not Found");
      }
    }),
];

module.exports = {
  createDriverValidationRules,
  getDriverValidationRules,
  getDriverByMobileValidationRules,
};
