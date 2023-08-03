const express = require("express");
const router = express.Router();

const { getRules } = require("../controlers/rule");
const { GetRulesAuth } = require("../middlewares/authorizations");
const { AppError, ERROR_STATUSES, STATUS_CODES } = require("../utills/error");

router.get("/", GetRulesAuth, async (req, res, next) => {
  try {
    const rules = await getRules();
    if (!rules)
      throw new AppError(
        "Can't Get Rules!",
        ERROR_STATUSES.FAIL,
        STATUS_CODES.INTERNAL_ERROR
      );
    return res.json(rules);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
