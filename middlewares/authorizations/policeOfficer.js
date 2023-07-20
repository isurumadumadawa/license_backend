const { ValidateToken } = require("../../utills/functions");
const {
  AppError,
  ERROR_STATUSES,
  STATUS_CODES,
} = require("../../utills/error");

const { handleError } = require("../error");

const CreatePoliceOfficerAuth = async (req, res, next) => {
  const isAuthorized = await ValidateToken(req);

  if (isAuthorized) {
    if (req?.user?.roleId && req?.user?.roleId == "1") return next();
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

const GetPoliceOfficerAuth = async (req, res, next) => {
  const isAuthorized = await ValidateToken(req);

  if (isAuthorized) {
    if (req?.user?.roleId && req?.user?.roleId == "1") return next();
    if (req?.user?.uuid && req?.user?.uuid == req.params.uuid) return next();
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

const GetPoliceOfficersAuth = async (req, res, next) => {
  const isAuthorized = await ValidateToken(req);

  if (isAuthorized) {
    if (req?.user?.roleId && req?.user?.roleId == "1") return next();
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
  CreatePoliceOfficerAuth,
  GetPoliceOfficerAuth,
  GetPoliceOfficersAuth,
};
