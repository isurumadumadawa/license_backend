const express = require("express");
const router = express.Router();

const {
  userLogin,
  driverLogin,
  changeUserPassword,
} = require("../controlers/auth");
const {
  validate,
  loginValidationRules,
  driverLoginValidationRules,
  changePasswordValidationRules,
} = require("../middlewares/validators");
const { AppError, ERROR_STATUSES, STATUS_CODES } = require("../utills/error");

router.post(
  "/login",
  loginValidationRules,
  validate,
  async (req, res, next) => {
    try {
      const { userName, password } = req.body;
      const login = await userLogin({ password, userName });
      if (!login)
        throw new AppError(
          "Can't Login User!",
          ERROR_STATUSES.FAIL,
          STATUS_CODES.INTERNAL_ERROR
        );

      return res.json(login);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.post(
  "/driver-login",
  driverLoginValidationRules,
  validate,
  async (req, res, next) => {
    try {
      const { mobileNumber } = req.body;
      const login = await driverLogin({ mobileNumber });
      if (!login)
        throw new AppError(
          "Can't Login User!",
          ERROR_STATUSES.FAIL,
          STATUS_CODES.INTERNAL_ERROR
        );

      return res.json(login);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.post(
  "/change-password",
  changePasswordValidationRules,
  validate,
  async (req, res, next) => {
    try {
      const { userName, password, newPassword } = req.body;
      const login = await changeUserPassword({
        password,
        userName,
        newPassword,
      });
      if (!login)
        throw new AppError(
          "Can't Update Password!",
          ERROR_STATUSES.FAIL,
          STATUS_CODES.INTERNAL_ERROR
        );
      return res.json(login);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

module.exports = router;
