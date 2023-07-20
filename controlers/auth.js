const { getUserByName: getUserByNameService } = require("../services/user");
const {
  ValidatePassword,
  GeneratePassword,
  GenerateSalt,
  GenerateToken,
  FormateData,
} = require("../utills/functions");

const { AppError, ERROR_STATUSES, STATUS_CODES } = require("../utills/error");

const userLogin = async ({ userName, password }) => {
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
  changeUserPassword,
};
