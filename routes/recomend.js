const express = require("express");
const router = express.Router();

const { getRecomendation } = require("../controlers/recomend");
const { GetRecomendationAuth } = require("../middlewares/authorizations");
const {
  getRecomendationRules,
  validate,
} = require("../middlewares/validators");
const { AppError, ERROR_STATUSES, STATUS_CODES } = require("../utills/error");

router.post(
  "/",
  GetRecomendationAuth,
  getRecomendationRules,
  validate,
  async (req, res, next) => {
    const { rules } = req.body;
    try {
      const recomendation = await getRecomendation({
        rules,
      });
      if (!recomendation)
        throw new AppError(
          "Can't Get Recomendation!",
          ERROR_STATUSES.FAIL,
          STATUS_CODES.INTERNAL_ERROR
        );

      return res.json(recomendation);
    } catch (error) {
      console.log("error........", error);
      next(error);
    }
  }
);

module.exports = router;
