const { PoliceOfficer, User } = require("../models");

const createPoliceOfficer = async ({ name, rank, userId, policeStationId }) => {
  return await PoliceOfficer.create({
    name,
    rank,
    userId,
    policeStationId,
  });
};

const getPoliceOfficerByUuid = async ({ uuid }) => {
  return await User.findOne({
    where: { uuid },
    include: ["role", "policeOfficer"],
  });
};

const getPoliceOfficers = async () => {
  return await User.findAll({
    where: { roleId: 3 },
    include: ["role", "policeOfficer"],
  });
};

module.exports = {
  createPoliceOfficer,
  getPoliceOfficerByUuid,
  getPoliceOfficers,
};
