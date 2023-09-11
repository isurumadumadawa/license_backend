const { Panelty } = require("../models");

const createPanelty = async ({
  driverId,
  vehicleId,
  vehicleNumber,
  policeOfficerId,
  policeStationId,
  issuedDate,
  expireDate,
  isCourt,
}) => {
  return await Panelty.create({
    driverId,
    vehicleId,
    vehicleNumber,
    policeOfficerId,
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
    include: ["panelties", "driver", "vehicle", "policeArea", "policeOfficer"],
    where: { driverId },
    order: [["issuedDate", "DESC"]],
  });
};

const updatePaneltyToClose = async ({ id }) => {
  return await Panelty.update(
    { isClosed: true },
    {
      where: { id },
    }
  );
};

module.exports = {
  createPanelty,
  getPanelties,
  getUserPanelties,
  updatePaneltyToClose,
};
