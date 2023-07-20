const { PoliceStation, User } = require("../models");

const createPoliceStation = async ({ name, city, userId }) => {
  return await PoliceStation.create({
    name,
    city,
    userId,
  });
};

const getPoliceStationByUuid = async ({ uuid }) => {
  return await User.findOne({
    where: { uuid },
    include: ["role", "policeStation"],
  });
};

const getPoliceStationDataByUuid = async ({ uuid }) => {
  return await PoliceStation.findOne({
    where: { uuid },
  });
};

const getPoliceStations = async () => {
  return await User.findAll({
    where: { roleId: 4 },
    include: ["role", "policeStation"],
  });
};

module.exports = {
  createPoliceStation,
  getPoliceStationByUuid,
  getPoliceStationDataByUuid,
  getPoliceStations,
};
