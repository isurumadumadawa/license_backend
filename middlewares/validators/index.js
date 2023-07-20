const { validationResult } = require("express-validator");

const {
  AppError,
  ERROR_STATUSES,
  STATUS_CODES,
} = require("../../utills/error");

const {
  loginValidationRules,
  changePasswordValidationRules,
} = require("./auth");
const {
  createDMTOfficerValidationRules,
  getDMTOfficerValidationRules,
} = require("./DMTOfficer");

const {
  createPoliceOfficerValidationRules,
  getPoliceOfficerValidationRules,
} = require("./policeOfficer");

const {
  createPoliceStationValidationRules,
  getPoliceStationValidationRules,
} = require("./policeStation");

const {
  createDriverValidationRules,
  getDriverValidationRules,
} = require("./driver");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  throw new AppError(
    extractedErrors[0][Object.keys(extractedErrors[0])[0]],
    ERROR_STATUSES.INVALID,
    STATUS_CODES.BAD_REQUEST
  );
};

module.exports = {
  createDriverValidationRules,
  getDriverValidationRules,
  loginValidationRules,
  changePasswordValidationRules,
  createDMTOfficerValidationRules,
  getDMTOfficerValidationRules,
  createPoliceOfficerValidationRules,
  getPoliceOfficerValidationRules,
  createPoliceStationValidationRules,
  getPoliceStationValidationRules,
  validate,
};