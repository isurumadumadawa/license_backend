const { validationResult } = require("express-validator");

const {
  AppError,
  ERROR_STATUSES,
  STATUS_CODES,
} = require("../../utills/error");

const {
  loginValidationRules,
  changePasswordValidationRules,
  driverLoginValidationRules,
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

const {
  createPaneltyValidationRules,
  getUserPaneltiesValidationRules,
  updatePaneltyValidationRules,
} = require("./panelty");

const { getRecomendationRules } = require("./recomend");

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
  driverLoginValidationRules,
  changePasswordValidationRules,
  createDMTOfficerValidationRules,
  getDMTOfficerValidationRules,
  createPoliceOfficerValidationRules,
  getPoliceOfficerValidationRules,
  createPoliceStationValidationRules,
  getPoliceStationValidationRules,
  createPaneltyValidationRules,
  getUserPaneltiesValidationRules,
  updatePaneltyValidationRules,
  getRecomendationRules,
  validate,
};
