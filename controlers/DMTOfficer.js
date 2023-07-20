const {
  createUser: createUserService,
  getUserByUuid: getUserByUuidService,
  getSpecificRoleUser: getSpecificRoleUserService,
} = require("../services/user");
const { GenerateSalt, GeneratePassword } = require("../utills/functions");
const { AppError, ERROR_STATUSES, STATUS_CODES } = require("../utills/error");

const createDMTOfficer = async ({ userName, password }) => {
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

  const DMTOfficer = await createUserService({
    userName,
    password: authPassword,
    roleId: 2,
    salt,
  });
  if (!DMTOfficer)
    throw new AppError(
      "Can't Create User!",
      ERROR_STATUSES.FAIL,
      STATUS_CODES.INTERNAL_ERROR
    );
  DMTOfficer.password = undefined;
  DMTOfficer.salt = undefined;

  return DMTOfficer;
};

const getDMTOfficer = async ({ uuid }) => {
  const DMTOfficer = await getUserByUuidService({ uuid });
  if (!DMTOfficer)
    throw new AppError(
      "User Not Found!",
      ERROR_STATUSES.INVALID,
      STATUS_CODES.NOT_FOUND
    );
  DMTOfficer.password = undefined;
  DMTOfficer.salt = undefined;
  return DMTOfficer;
};

const getDMTOfficers = async () => {
  const DMTOfficers = await getSpecificRoleUserService({ roleId: 2 });
  if (!DMTOfficers)
    throw new AppError(
      "Users Not Found!",
      ERROR_STATUSES.INVALID,
      STATUS_CODES.NOT_FOUND
    );

  const RefactoredDMTOfficers = DMTOfficers.map((DMTOfficer) => {
    DMTOfficer.password = undefined;
    DMTOfficer.salt = undefined;
    return DMTOfficer;
  });

  return RefactoredDMTOfficers;
};

module.exports = {
  createDMTOfficer,
  getDMTOfficer,
  getDMTOfficers,
};
