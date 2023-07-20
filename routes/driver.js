const express = require("express");
const router = express.Router();

const { createDriver, getDriver, getDrivers } = require("../controlers/driver");
const {
  validate,
  createDriverValidationRules,
  getDriverValidationRules,
} = require("../middlewares/validators");
const {
  CreateDriverAuth,
  GetDriverAuth,
  GetDriversAuth,
} = require("../middlewares/authorizations");
const { AppError, ERROR_STATUSES, STATUS_CODES } = require("../utills/error");

router.post(
  "/",
  CreateDriverAuth,
  createDriverValidationRules,
  validate,
  async (req, res, next) => {
    const {
      userName,
      password,
      name,
      otherName,
      mobileNumber,
      gender,
      bloodType,
      address,
      dob,
      image,
      issuedDate,
      expireDate,
      vehicles,
    } = req.body;
    try {
      const user = await createDriver({
        userName,
        password,
        name,
        otherName,
        mobileNumber,
        gender,
        bloodType,
        address,
        dob,
        image,
        issuedDate,
        expireDate,
        vehicles,
      });
      if (!user)
        throw new AppError(
          "Can't Create User!",
          ERROR_STATUSES.FAIL,
          STATUS_CODES.INTERNAL_ERROR
        );

      return res.json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.get("/", GetDriversAuth, async (req, res, next) => {
  try {
    const users = await getDrivers();
    if (!users)
      throw new AppError(
        "Can't Get Users!",
        ERROR_STATUSES.FAIL,
        STATUS_CODES.INTERNAL_ERROR
      );
    return res.json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get(
  "/:uuid",
  GetDriverAuth,
  getDriverValidationRules,
  validate,
  async (req, res, next) => {
    try {
      const uuid = req.params.uuid;
      console.log(uuid);
      const user = await getDriver({ uuid });
      if (!user)
        throw new AppError(
          "Can't Get User!",
          ERROR_STATUSES.FAIL,
          STATUS_CODES.INTERNAL_ERROR
        );
      return res.json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

module.exports = router;
