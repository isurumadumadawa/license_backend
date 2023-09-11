const { getRulesById: getRulesByIdService } = require("../services/rule");
const {
  getUserPanelties: getUserPaneltiesService,
} = require("../services/panelty");
const { loadModelWithMetadata, getRecommendValue } = require("../utills/model");

let model = null;
let metadata = null;
async function runModel() {
  try {
    const modelWithMetadata = await loadModelWithMetadata();
    model = modelWithMetadata?.model;
    metadata = modelWithMetadata?.metadata;
  } catch (error) {
    console.error("Error loading model with metadata:", error);
  }
}

// Run the asynchronous function
runModel();

const { AppError, ERROR_STATUSES, STATUS_CODES } = require("../utills/error");

const getRecomendation = async ({
  driverId,
  vehicleId,
  policeStationId,
  issuedDate,
  rules,
}) => {
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

  //data pre-prossesing

  const driverPenalties = await getUserPaneltiesService({ driverId });

  const vehicleTypeSum = sumVehicleIdByType(driverPenalties, vehicleId);
  const policeAreaSum = sumPoliceArea(driverPenalties, policeStationId);
  const penaltySum = sumPenalty(driverPenalties);

  let fromLast = 0;
  if (driverPenalties && driverPenalties.length && driverPenalties[0]) {
    fromLast = daysBetweenDates(driverPenalties[0]?.issuedDate, issuedDate);
  }
  const inputData = [];

  rules?.map((rule) => {
    const ruleSum = sumRule(driverPenalties, rule);
    const input = [
      penaltySum,
      vehicleTypeSum,
      fromLast,
      policeAreaSum,
      ruleSum,
    ];
    inputData.push(input);
  });

  const predictedValues = await getRecommendValue(model, metadata, inputData);

  const newRecommendationWithPredict = newRecomendations?.map((rec, i) => {
    return {
      id: rec?.id,
      penalty: Math.round(rec?.penalty + rec?.penalty * predictedValues[i]),
      score: rec?.score,
    };
  });

  return newRecommendationWithPredict;
};

//functions

function sumVehicleIdByType(data, vehicleType) {
  let sum = 0;
  for (const item of data) {
    if (item.vehicleId === vehicleType) {
      sum += 1;
    }
  }
  return sum;
}
function sumPoliceArea(data, policeStationId) {
  let sum = 0;
  for (const item of data) {
    if (item.policeStationId === policeStationId) {
      sum += 1;
    }
  }
  return sum;
}

function sumRule(data, rule) {
  let sum = 0;
  for (const item of data) {
    if (item?.panelties) {
      for (const penalty of item?.panelties) {
        if (penalty.id === rule) {
          sum += 1;
        }
      }
    }
  }
  return sum;
}

function sumPenalty(data) {
  let sum = 0;
  for (const item of data) {
    if (item?.panelties) {
      for (const penalty of item?.panelties) {
        sum += 1;
      }
    }
  }
  return sum;
}

function daysBetweenDates(date1, date2) {
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  // Calculate the time difference in milliseconds
  const timeDifference = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to days
  const daysDifference = timeDifference / (1000 * 3600 * 24);

  return Math.abs(Math.floor(daysDifference)); // Use Math.abs to ensure a positive result
}

module.exports = {
  getRecomendation,
};
