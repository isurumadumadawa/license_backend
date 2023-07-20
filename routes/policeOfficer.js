const express = require("express");
const router = express.Router();

const {
  createPoliceOfficer,
  getPoliceOfficer,
  getPoliceOfficers,
} = require("../controlers/policeOfficer");
const {
  validate,
  createPoliceOfficerValidationRules,
  getPoliceOfficerValidationRules,
} = require("../middlewares/validators");
const {
  CreatePoliceOfficerAuth,
  GetPoliceOfficerAuth,
  GetPoliceOfficersAuth,
} = require("../middlewares/authorizations");
const { AppError, ERROR_STATUSES, STATUS_CODES } = require("../utills/error");

router.post(
  "/",
  CreatePoliceOfficerAuth,
  createPoliceOfficerValidationRules,
  validate,
  async (req, res, next) => {
    const { userName, password, name, rank, policeStationId } = req.body;
    try {
      const user = await createPoliceOfficer({
        userName,
        password,
        name,
        rank,
        policeStationId,
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

router.get("/", GetPoliceOfficersAuth, async (req, res, next) => {
  try {
    const users = await getPoliceOfficers();
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
  GetPoliceOfficerAuth,
  getPoliceOfficerValidationRules,
  validate,
  async (req, res, next) => {
    try {
      const uuid = req.params.uuid;
      console.log(uuid);
      const user = await getPoliceOfficer({ uuid });
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
