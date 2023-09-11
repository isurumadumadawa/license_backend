const { body, param } = require("express-validator");
const {
  Driver,
  PoliceStation,
  Panelty,
  Vehicle,
  PoliceOfficer,
} = require("../../models");

const { Rule } = require("../../models");
const getRecomendationRules = [
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
  body("rules")
    .isArray({ min: 1 })
    .withMessage("At least one rule must be provided")
    .custom(async (value) => {
      const rule = await Rule.findOne({
        where: { id: value },
      });
      if (!rule) {
        return Promise.reject("Rule Not Found");
      }
    }),
];

module.exports = {
  getRecomendationRules,
};

const driverId = 1;
const vehicleType = 1;
const policeArea = 1;
const rule = 2;
const day1 = "2023-07-29T00:00:00.000Z";
const day2 = "2023-06-29T00:00:00.000Z";
