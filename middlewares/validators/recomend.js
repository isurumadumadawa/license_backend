const { body, param } = require("express-validator");

const { Rule } = require("../../models");
const getRecomendationRules = [
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
