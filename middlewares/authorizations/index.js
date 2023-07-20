const {
  CreateDMTOfficerAuth,
  GetDMTOfficerAuth,
  GetDMTOfficersAuth,
} = require("./DMTOfficer");

const {
  CreatePoliceOfficerAuth,
  GetPoliceOfficerAuth,
  GetPoliceOfficersAuth,
} = require("./policeOfficer");

const {
  CreatePoliceStationAuth,
  GetPoliceStationAuth,
  GetPoliceStationsAuth,
} = require("./policeStation");

const { CreateDriverAuth, GetDriverAuth, GetDriversAuth } = require("./driver");

module.exports = {
  CreateDMTOfficerAuth,
  GetDMTOfficerAuth,
  GetDMTOfficersAuth,
  CreatePoliceOfficerAuth,
  GetPoliceOfficerAuth,
  GetPoliceOfficersAuth,
  CreatePoliceStationAuth,
  GetPoliceStationAuth,
  GetPoliceStationsAuth,
  CreateDriverAuth,
  GetDriverAuth,
  GetDriversAuth,
};
