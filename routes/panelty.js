const express = require("express");
const router = express.Router();

const { createPanelty, getPanelties } = require("../controlers/panelty");
const {
  validate,
  createPaneltyValidationRules,
  getUserPaneltiesValidationRules,
} = require("../middlewares/validators");
const {
  CreatePaneltyAuth,
  GetPaneltiesAuth,
  GetUserPaneltiesAuth,
} = require("../middlewares/authorizations");
const { AppError, ERROR_STATUSES, STATUS_CODES } = require("../utills/error");
const { getUserPanelties } = require("../services/panelty");

router.post(
  "/",
  CreatePaneltyAuth,
  createPaneltyValidationRules,
  validate,
  async (req, res, next) => {
    const {
      driverId,
      vehicleId,
      vehicleNumber,
      policeOfficerId,
      policeStationId,
      issuedDate,
      expireDate,
      isCourt,
      rules,
    } = req.body;
    try {
      const panelty = await createPanelty({
        driverId,
        vehicleId,
        vehicleNumber,
        policeOfficerId,
        policeStationId,
        issuedDate,
        expireDate,
        isCourt,
        rules,
      });
      if (!panelty)
        throw new AppError(
          "Can't Create Panelty!",
          ERROR_STATUSES.FAIL,
          STATUS_CODES.INTERNAL_ERROR
        );

      return res.json(panelty);
    } catch (error) {
      console.log("error........", error);
      next(error);
    }
  }
);

router.get(
  "/",
  GetPaneltiesAuth,
  getUserPaneltiesValidationRules,
  validate,
  async (req, res, next) => {
    try {
      const panelties = await getPanelties();
      if (!panelties)
        throw new AppError(
          "Can't Get Panelties!",
          ERROR_STATUSES.FAIL,
          STATUS_CODES.INTERNAL_ERROR
        );
      return res.json(panelties);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.get("/:id", GetUserPaneltiesAuth, async (req, res, next) => {
  try {
    const driverId = req.params.id;
    const panelties = await getUserPanelties({ driverId });
    if (!panelties)
      throw new AppError(
        "Can't Get Panelties!",
        ERROR_STATUSES.FAIL,
        STATUS_CODES.INTERNAL_ERROR
      );
    return res.json(panelties);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
