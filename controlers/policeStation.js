const { createUser: createUserService } = require("../services/user");
const {
  createPoliceStation: createPoliceStationService,
  getPoliceStationByUuid: getPoliceStationByUuidService,
  getPoliceStations: getPoliceStationsService,
} = require("../services/policeStation");

const { GenerateSalt, GeneratePassword } = require("../utills/functions");
const { AppError, ERROR_STATUSES, STATUS_CODES } = require("../utills/error");

const createPoliceStation = async ({ userName, password, name, city }) => {
  let salt = await GenerateSalt();
  if (!salt)
    throw new AppError(
      "Can't Generate The Salt!",
      ERROR_STATUSES.FAIL,
      STATUS_CODES.INTERNAL_ERROR
    );
  let authPassword = await GeneratePassword(password, salt);
  if (!authPassword)
    throw new AppError(
      "Can't Generate The Password!",
      ERROR_STATUSES.FAIL,
      STATUS_CODES.INTERNAL_ERROR
    );

  const user = await createUserService({
    userName,
    password: authPassword,
    roleId: 4,
    salt,
  });
  if (!user)
    throw new AppError(
      "Can't Create User!",
      ERROR_STATUSES.FAIL,
      STATUS_CODES.INTERNAL_ERROR
    );

  const policeStation = await createPoliceStationService({
    name,
    city,
    userId: user?.id,
  });

  if (!policeStation)
    throw new AppError(
      "Can't Create User!",
      ERROR_STATUSES.FAIL,
      STATUS_CODES.INTERNAL_ERROR
    );

  user.password = undefined;
  user.salt = undefined;

  return user;
};

const getPoliceStation = async ({ uuid }) => {
  const policeStation = await getPoliceStationByUuidService({ uuid });
  if (!policeStation)
    throw new AppError(
      "User Not Found!",
      ERROR_STATUSES.INVALID,
      STATUS_CODES.NOT_FOUND
    );
  policeStation.password = undefined;
  policeStation.salt = undefined;
  return policeStation;
};

const getPoliceStations = async () => {
  const policeStations = await getPoliceStationsService();
  if (!policeStations)
    throw new AppError(
      "Users Not Found!",
      ERROR_STATUSES.INVALID,
      STATUS_CODES.NOT_FOUND
    );

  const RefactoredpoliceStations = policeStations.map((policeStation) => {
    policeStation.password = undefined;
    policeStation.salt = undefined;
    return policeStation;
  });

  return RefactoredpoliceStations;
};

module.exports = {
  createPoliceStation,
  getPoliceStation,
  getPoliceStations,
};
