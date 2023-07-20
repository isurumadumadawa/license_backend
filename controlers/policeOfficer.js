const {
  createUser: createUserService,
  getUserByUuid: getUserByUuidService,
  getSpecificRoleUser: getSpecificRoleUserService,
} = require("../services/user");
const {
  createPoliceOfficer: createPoliceOfficerService,
  getPoliceOfficerByUuid: getPoliceOfficerByUuidService,
  getPoliceOfficers: getPoliceOfficersService,
} = require("../services/policeOfficer");

const {
  getPoliceStationDataByUuid: getPoliceStationDataByUuidService,
} = require("../services/policeStation");

const { GenerateSalt, GeneratePassword } = require("../utills/functions");
const { AppError, ERROR_STATUSES, STATUS_CODES } = require("../utills/error");

const createPoliceOfficer = async ({
  userName,
  password,
  name,
  rank,
  policeStationId,
}) => {
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
    roleId: 3,
    salt,
  });
  if (!user)
    throw new AppError(
      "Can't Create User!",
      ERROR_STATUSES.FAIL,
      STATUS_CODES.INTERNAL_ERROR
    );

  const policeOfficer = await createPoliceOfficerService({
    name,
    rank,
    userId: user?.id,
    policeStationId,
  });

  if (!policeOfficer)
    throw new AppError(
      "Can't Create User!",
      ERROR_STATUSES.INVALID,
      STATUS_CODES.NOT_FOUND
    );
  user.password = undefined;
  user.salt = undefined;

  return user;
};

const getPoliceOfficer = async ({ uuid }) => {
  const policeOfficer = await getPoliceOfficerByUuidService({ uuid });
  if (!policeOfficer)
    throw new AppError(
      "User Not Found!",
      ERROR_STATUSES.INVALID,
      STATUS_CODES.NOT_FOUND
    );
  policeOfficer.password = undefined;
  policeOfficer.salt = undefined;
  return policeOfficer;
};

const getPoliceOfficers = async () => {
  const policeOfficers = await getPoliceOfficersService();
  if (!policeOfficers)
    throw new AppError(
      "Users Not Found!",
      ERROR_STATUSES.INVALID,
      STATUS_CODES.NOT_FOUND
    );

  const RefactoredpoliceOfficers = policeOfficers.map((policeOfficer) => {
    policeOfficer.password = undefined;
    policeOfficer.salt = undefined;
    return policeOfficer;
  });

  return RefactoredpoliceOfficers;
};

module.exports = {
  createPoliceOfficer,
  getPoliceOfficer,
  getPoliceOfficers,
};
