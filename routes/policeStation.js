const express = require("express");
const router = express.Router();

const {
  createPoliceStation,
  getPoliceStation,
  getPoliceStations,
} = require("../controlers/policeStation");
const {
  validate,
  createPoliceStationValidationRules,
  getPoliceStationValidationRules,
} = require("../middlewares/validators");
const {
  CreatePoliceStationAuth,
  GetPoliceStationAuth,
  GetPoliceStationsAuth,
} = require("../middlewares/authorizations");
const { AppError, ERROR_STATUSES, STATUS_CODES } = require("../utills/error");

router.post(
  "/",
  CreatePoliceStationAuth,
  createPoliceStationValidationRules,
  validate,
  async (req, res, next) => {
    const { userName, password, name, city } = req.body;
    try {
      const user = await createPoliceStation({
        userName,
        password,
        name,
        city,
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

router.get("/", GetPoliceStationsAuth, async (req, res, next) => {
  try {
    const users = await getPoliceStations();
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
  GetPoliceStationAuth,
  getPoliceStationValidationRules,
  validate,
  async (req, res, next) => {
    try {
      const uuid = req.params.uuid;
      console.log(uuid);
      const user = await getPoliceStation({ uuid });
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
