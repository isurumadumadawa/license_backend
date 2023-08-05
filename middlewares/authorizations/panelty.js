const { ValidateToken } = require("../../utills/functions");
const {
  AppError,
  ERROR_STATUSES,
  STATUS_CODES,
} = require("../../utills/error");

const { handleError } = require("../error");

const CreatePaneltyAuth = async (req, res, next) => {
  const isAuthorized = await ValidateToken(req);

  if (isAuthorized) {
    if (req?.user?.roleId && req?.user?.roleId == "3") return next();
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

const GetPaneltiesAuth = async (req, res, next) => {
  const isAuthorized = await ValidateToken(req);

  if (isAuthorized) {
    if (req?.user?.roleId && req?.user?.roleId == "4") return next();
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

const GetUserPaneltiesAuth = async (req, res, next) => {
  const isAuthorized = await ValidateToken(req);

  if (isAuthorized) {
    if (
      req?.user?.roleId &&
      (req?.user?.roleId == "4" || req?.user?.roleId == "3")
    )
      return next();

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

const UpdatePaneltyAuth = async (req, res, next) => {
  const isAuthorized = await ValidateToken(req);

  if (isAuthorized) {
    if (req?.user?.roleId && req?.user?.roleId == "4") return next();
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
  CreatePaneltyAuth,
  UpdatePaneltyAuth,
  GetPaneltiesAuth,
  GetUserPaneltiesAuth,
};
