const { getRulesById: getRulesByIdService } = require("../services/rule");

const { AppError, ERROR_STATUSES, STATUS_CODES } = require("../utills/error");

const getRecomendation = async ({ rules }) => {
  const recomendation = await getRulesByIdService({ rules });
  if (!recomendation)
    throw new AppError(
      "Rules Not Found!",
      ERROR_STATUSES.INVALID,
      STATUS_CODES.NOT_FOUND
    );

  const newRecomendations = recomendation.map((rec) => {
    return {
      id: rec?.id,
      penalty: rec?.penalty,
      score: rec?.score,
    };
  });

  return newRecomendations;
};

module.exports = {
  getRecomendation,
};
