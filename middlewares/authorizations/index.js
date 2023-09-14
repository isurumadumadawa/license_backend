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

const {
  CreateDriverAuth,
  GetDriverAuth,
  GetDriverByMobileAuth,
  GetDriversAuth,
} = require("./driver");

const { GetRulesAuth } = require("./rule");

const {
  CreatePaneltyAuth,
  GetPaneltiesAuth,
  GetUserPaneltiesAuth,
  UpdatePaneltyAuth,
} = require("./panelty");

const { GetRecomendationAuth } = require("./recomend");

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
  GetDriverByMobileAuth,
  GetDriversAuth,
  GetRulesAuth,
  CreatePaneltyAuth,
  GetPaneltiesAuth,
  GetUserPaneltiesAuth,
  UpdatePaneltyAuth,
  GetRecomendationAuth,
};
