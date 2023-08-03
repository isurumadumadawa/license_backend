const { ValidateToken } = require("../../utills/functions");
const {
  AppError,
  ERROR_STATUSES,
  STATUS_CODES,
} = require("../../utills/error");

const { handleError } = require("../error");

const GetRulesAuth = async (req, res, next) => {
  const isAuthorized = await ValidateToken(req);

  if (isAuthorized) {
    return next();
  }

  handleError({
    error: new AppError(
      "unauthorized!",
      ERROR_STATUSES.FORBIDDEN,
      STATUS_CODES.FORBIDDEN
    ),
    req,
    res,
    next,
  });
};

module.exports = {
  GetRulesAuth,
};
