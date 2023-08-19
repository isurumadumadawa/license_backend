const { Rule } = require("../models");

const getRules = async () => {
  return await Rule.findAll();
};

const getRulesById = async ({ rules }) => {
  return await Rule.findAll({
    where: {
      id: rules,
    },
  });
};

module.exports = {
  getRules,
  getRulesById,
};
