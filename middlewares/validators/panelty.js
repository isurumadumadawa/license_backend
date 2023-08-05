const { body, param } = require("express-validator");

const { Driver, PoliceStation, Panelty, Vehicle } = require("../../models");
const createPaneltyValidationRules = [
  body("driverId", "Required Valid Driver Id!")
    .isNumeric()
    .notEmpty()
    .custom(async (value) => {
      const driver = await Driver.findOne({
        where: { id: value },
      });
      if (!driver) {
        return Promise.reject("Driver Not Found");
      }
    }),
  body("vehicleId", "Required Valid Vehicle Type!")
    .isNumeric()
    .notEmpty()
    .custom(async (value) => {
      const user = await Vehicle.findOne({
        where: { id: value },
      });
      if (!user) {
        return Promise.reject("Vehicle Not Found");
      }
    }),
  body("policeStationId", "Required Valid Police Station!")
    .isNumeric()
    .notEmpty()
    .custom(async (value) => {
      const user = await PoliceStation.findOne({
        where: { id: value },
      });
      if (!user) {
        return Promise.reject("Police Station Not Found");
      }
    }),
  body("issuedDate", "Required Valid Issued Date!")
    .isString()
    .notEmpty()
    .isISO8601(),
  body("expireDate", "Required Valid Expiry Date!")
    .isString()
    .notEmpty()
    .isISO8601(),
  body("isCourt", "Required Valid value for IsCourt!").isBoolean().notEmpty(),
  body("rules")
    .isArray({ min: 1 })
    .withMessage("At least one rule must be provided"),
  body("rules.*.panelty", "Required Valid Panelty!").isNumeric().notEmpty(),
  body("rules.*.ruleId", "Required Valid Rule!").isNumeric().notEmpty(),
  body("rules.*.score", "Required Valid Score!").isNumeric().notEmpty(),
];

const updatePaneltyValidationRules = [
  param("uuid", "Panelty Id id Required!")
    .isString()
    .notEmpty()
    .custom(async (value) => {
      const user = await Panelty.findOne({
        where: { uuid: value },
      });
      if (!user) {
        return Promise.reject("Panelty Not Found");
      }
    }),
  body("image", "Required Valid Image URL!")
    .isString()
    .notEmpty()
    .isURL({ require_protocol: true }),
];

const getUserPaneltiesValidationRules = [
  param("id", "Panelty Id id Required!")
    .isString()
    .notEmpty()
    .custom(async (value) => {
      const user = await Driver.findOne({
        where: { id: value },
      });
      if (!user) {
        return Promise.reject("Driver Not Found");
      }
    }),
];

module.exports = {
  createPaneltyValidationRules,
  updatePaneltyValidationRules,
  getUserPaneltiesValidationRules,
};
