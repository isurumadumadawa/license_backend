const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

const ERROR_STATUSES = {
  FAIL: "Fail",
  INVALID: "Invalid",
  UN_AUTHORISED: "Unauthorized",
  FORBIDDEN: "Forbidden",
};

class AppError extends Error {
  constructor(message, status, statusCode) {
    super(message);
    this.status = status;
    this.statusCode = statusCode;
    this.name = this.constructor.name;

    // Ensure the error stack is captured
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  STATUS_CODES,
  ERROR_STATUSES,
  AppError,
};
