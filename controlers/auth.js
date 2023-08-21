const {
  getUserByName: getUserByNameService,
  getUserByid: getUserByidService,
} = require("../services/user");
const {
  getDriverByMobileNumber: getDriverByMobileNumberService,
} = require("../services/driver");
const {
  ValidatePassword,
  GeneratePassword,
  GenerateSalt,
  GenerateToken,
  GenerateOTP,
  SendMsg,
  FormateData,
} = require("../utills/functions");

const { AppError, ERROR_STATUSES, STATUS_CODES } = require("../utills/error");

const userLogin = async ({ userName, password }) => {
  const user = await getUserByNameService({ userName });
  console.log("user......", user);
  if (!user)
    throw new AppError(
      "User Not Found!",
      ERROR_STATUSES.INVALID,
      STATUS_CODES.NOT_FOUND
    );

  const validPassword = await ValidatePassword(
    password,
    user.password,
    user.salt
  );
  if (!validPassword)
    throw new AppError(
      "Invalid Password!",
      ERROR_STATUSES.UN_AUTHORISED,
      STATUS_CODES.UN_AUTHORISED
    );

  const token = await GenerateToken({
    uuid: user?.uuid,
    userName: user?.userName,
    roleId: user?.roleId,
    role: user?.role?.role,
  });
  if (!token)
    throw new AppError(
      "Can't Generate The Token",
      ERROR_STATUSES.FAIL,
      STATUS_CODES.INTERNAL_ERROR
    );
  return FormateData({
    token,
    userId: user?.uuid,
    userName: user?.userName,
    roleId: user?.roleId,
    role: user?.role?.role,
    id: user?.policeOfficer?.id,
    //id: "jkegtrtg",
  });
};

const driverLogin = async ({ mobileNumber }) => {
  const driver = await getDriverByMobileNumberService({ mobileNumber });

  if (!driver)
    throw new AppError(
      "Driver Not Found!",
      ERROR_STATUSES.INVALID,
      STATUS_CODES.NOT_FOUND
    );

  const user = await getUserByidService({ id: driver?.userId });

  if (!user)
    throw new AppError(
      "User Not Found!",
      ERROR_STATUSES.INVALID,
      STATUS_CODES.NOT_FOUND
    );

  const token = await GenerateToken({
    uuid: user?.uuid,
    userName: user?.userName,
    roleId: user?.roleId,
    role: user?.role?.role,
  });
  if (!token)
    throw new AppError(
      "Can't Generate The Token",
      ERROR_STATUSES.FAIL,
      STATUS_CODES.INTERNAL_ERROR
    );

  const otp = GenerateOTP();

  const msg = await SendMsg({
    mobileNumber: mobileNumber,
    body: `One Time Password is ${otp}`,
  });
  console.log("msg......", msg);
  return FormateData({
    token,
    userId: driver?.uuid,
    userName: user?.userName,
    roleId: user?.roleId,
    role: user?.role?.role,
    id: user?.policeOfficer?.id,
    otp,
  });
};

const changeUserPassword = async ({ userName, password, newPassword }) => {
  const user = await getUserByNameService({ userName });
  if (!user)
    throw new AppError(
      "User Not Found!",
      ERROR_STATUSES.INVALID,
      STATUS_CODES.NOT_FOUND
    );

  const validPassword = await ValidatePassword(
    password,
    user.password,
    user.salt
  );
  if (!validPassword)
    throw new AppError(
      "Invalid Current Password!",
      ERROR_STATUSES.UN_AUTHORISED,
      STATUS_CODES.UN_AUTHORISED
    );

  let salt = await GenerateSalt();
  if (!salt)
    throw new AppError(
      "Can't Generate The Salt",
      ERROR_STATUSES.FAIL,
      STATUS_CODES.INTERNAL_ERROR
    );
  let newAuthPassword = await GeneratePassword(newPassword, salt);
  if (!newAuthPassword)
    throw new AppError(
      "Can't Generate The New Password",
      ERROR_STATUSES.FAIL,
      STATUS_CODES.INTERNAL_ERROR
    );

  user.password = newAuthPassword;
  user.salt = salt;

  await user.save();

  const token = await GenerateToken({
    uuid: user?.uuid,
    userName: user?.userName,
    roleId: user?.roleId,
    role: user?.role?.role,
  });
  if (!token)
    throw new AppError(
      "Can't Generate The Token",
      ERROR_STATUSES.FAIL,
      STATUS_CODES.INTERNAL_ERROR
    );
  return FormateData({
    token,
  });
};

module.exports = {
  userLogin,
  driverLogin,
  changeUserPassword,
};
