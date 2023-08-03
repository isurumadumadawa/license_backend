const { Rule } = require("../models");

const getRules = async () => {
  return await Rule.findAll();
};

module.exports = {
  getRules,
};
