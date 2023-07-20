const express = require("express");
const router = express.Router();

const {
  createDMTOfficer,
  getDMTOfficer,
  getDMTOfficers,
} = require("../controlers/DMTOfficer");
const {
  validate,
  createDMTOfficerValidationRules,
  getDMTOfficerValidationRules,
} = require("../middlewares/validators");
const {
  CreateDMTOfficerAuth,
  GetDMTOfficerAuth,
  GetDMTOfficersAuth,
} = require("../middlewares/authorizations");
const { AppError, ERROR_STATUSES, STATUS_CODES } = require("../utills/error");

router.post(
  "/",
  CreateDMTOfficerAuth,
  createDMTOfficerValidationRules,
  validate,
  async (req, res, next) => {
    const { userName, password } = req.body;
    try {
      const user = await createDMTOfficer({ userName, password });
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

router.get("/", GetDMTOfficersAuth, async (req, res, next) => {
  try {
    const users = await getDMTOfficers();
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
  GetDMTOfficerAuth,
  getDMTOfficerValidationRules,
  validate,
  async (req, res, next) => {
    try {
      const uuid = req.params.uuid;
      console.log(uuid);
      const user = await getDMTOfficer({ uuid });
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
