const {
  createUser: createUserService,
  getUserByUuid: getUserByUuidService,
  getSpecificRoleUser: getSpecificRoleUserService,
} = require("../services/user");
const {
  createDriver: createDriverService,
  getDriver: getDriverService,
} = require("../services/driver");
const {
  createDriverVehicle: createDriverVehicleService,
} = require("../services/driverVehicle");

const { GenerateSalt, GeneratePassword } = require("../utills/functions");
const { AppError, ERROR_STATUSES, STATUS_CODES } = require("../utills/error");

const createDriver = async ({
  userName,
  password,
  name,
  otherName,
  mobileNumber,
  gender,
  bloodType,
  address,
  dob,
  image,
  issuedDate,
  expireDate,
  vehicles,
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
    roleId: 5,
    salt,
  });
  if (!user)
    throw new AppError(
      "Can't Create User!",
      ERROR_STATUSES.FAIL,
      STATUS_CODES.INTERNAL_ERROR
    );

  const driver = await createDriverService({
    name,
    otherName,
    mobileNumber,
    gender,
    bloodType,
    address,
    dob,
    image,
    issuedDate,
    expireDate,
    userId: user.id,
  });
  if (!driver)
    throw new AppError(
      "Can't Create User!",
      ERROR_STATUSES.FAIL,
      STATUS_CODES.INTERNAL_ERROR
    );

  vehicles.map(async (vehicle) => {
    const driverVehicle = await createDriverVehicleService({
      driverId: driver.id,
      expireDate: vehicle.expireDate,
      issuedDate: vehicle.issuedDate,
      vehicleId: vehicle.vehicleId,
    });
    if (!driverVehicle)
      throw new AppError(
        "Can't Create User!",
        ERROR_STATUSES.FAIL,
        STATUS_CODES.INTERNAL_ERROR
      );
  });

  user.password = undefined;
  user.salt = undefined;

  return user;
};

const getDriver = async ({ uuid }) => {
  const driver = await getDriverService({ uuid });
  console.log("driver....", driver);
  if (!driver)
    throw new AppError(
      "User Not Found!",
      ERROR_STATUSES.INVALID,
      STATUS_CODES.NOT_FOUND
    );
  // driver.password = undefined;
  // driver.salt = undefined;
  return driver;
};

const getDrivers = async () => {
  const drivers = await getSpecificRoleUserService({ roleId: 5 });
  if (!drivers)
    throw new AppError(
      "Users Not Found!",
      ERROR_STATUSES.INVALID,
      STATUS_CODES.NOT_FOUND
    );

  const RefactoredDrivers = drivers.map((driver) => {
    driver.password = undefined;
    driver.salt = undefined;
    return driver;
  });

  return RefactoredDrivers;
};

module.exports = {
  createDriver,
  getDriver,
  getDrivers,
};
