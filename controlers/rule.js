const { getRules: getRulesService } = require("../services/rule");

const { AppError, ERROR_STATUSES, STATUS_CODES } = require("../utills/error");

const getRules = async () => {
  const rules = await getRulesService();
  if (!rules)
    throw new AppError(
      "Rules Not Found!",
      ERROR_STATUSES.INVALID,
      STATUS_CODES.NOT_FOUND
    );

  return rules;
};

module.exports = {
  getRules,
};
