const { Panelty } = require("../models");

const createPanelty = async ({
  driverId,
  vehicleId,
  policeStationId,
  issuedDate,
  expireDate,
  isCourt,
}) => {
  return await Panelty.create({
    driverId,
    vehicleId,
    policeStationId,
    issuedDate,
    expireDate,
    isCourt,
  });
};

const getPanelties = async () => {
  return await Panelty.findAll({
    include: ["panelties", "driver", "vehicle", "policeArea"],
  });
};

const getUserPanelties = async ({ driverId }) => {
  return await Panelty.findAll({
    include: ["panelties", "driver", "vehicle", "policeArea"],
    where: { driverId },
  });
};

module.exports = {
  createPanelty,
  getPanelties,
  getUserPanelties,
};
