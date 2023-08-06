const {
  createPanelty: createPaneltyService,
  getPanelties: getPaneltiesService,
  getUserPanelties: getUserPaneltiesService,
} = require("../services/panelty");
const {
  createPaneltyRule: createPaneltyRuleService,
} = require("../services/paneltyRule");

const { AppError, ERROR_STATUSES, STATUS_CODES } = require("../utills/error");

const createPanelty = async ({
  driverId,
  vehicleId,
  vehicleNumber,
  policeOfficerId,
  policeStationId,
  issuedDate,
  expireDate,
  isCourt,
  rules,
}) => {
  const panelty = await createPaneltyService({
    driverId,
    vehicleId,
    vehicleNumber,
    policeOfficerId,
    policeStationId,
    issuedDate,
    expireDate,
    isCourt,
  });
  if (!panelty)
    throw new AppError(
      "Can't Create Panelty!",
      ERROR_STATUSES.FAIL,
      STATUS_CODES.INTERNAL_ERROR
    );

  rules.map(async (rule) => {
    const paneltyRule = await createPaneltyRuleService({
      paneltyId: panelty?.id,
      panelty: rule?.panelty,
      ruleId: rule?.ruleId,
    });
    if (!paneltyRule)
      throw new AppError(
        "Can't Create Panelty!",
        ERROR_STATUSES.FAIL,
        STATUS_CODES.INTERNAL_ERROR
      );
  });

  return panelty;
};

const getPanelties = async () => {
  const panelties = await getPaneltiesService();
  if (!panelties)
    throw new AppError(
      "Can't Get Panelties!",
      ERROR_STATUSES.FAIL,
      STATUS_CODES.INTERNAL_ERROR
    );

  return panelties;
};

const getUserPanelties = async ({ driverId }) => {
  const panelties = await getUserPanelties({ driverId });
  if (!panelties)
    throw new AppError(
      "Can't Get Panelties!",
      ERROR_STATUSES.FAIL,
      STATUS_CODES.INTERNAL_ERROR
    );

  return panelties;
};

module.exports = {
  createPanelty,
  getPanelties,
  getUserPanelties,
};
