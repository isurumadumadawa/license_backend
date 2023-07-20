const { STATUS_CODES } = require("../utills/error");

const handleError = ({ error, req, res, next }) => {
  error.statusCode = error.statusCode || STATUS_CODES.INTERNAL_ERROR;
  error.status = error.status || "error";
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};

module.exports = {
  handleError,
};
