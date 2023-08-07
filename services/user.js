const { User } = require("../models");

const createUser = async ({ userName, password, roleId, salt }) => {
  return await User.create({ userName, password, roleId, salt });
};

const getUserByName = async ({ userName }) => {
  return await User.findOne({
    where: { userName },
    include: ["role", "policeOfficer"],
  });
};

const getUserByUuid = async ({ uuid }) => {
  return await User.findOne({
    where: { uuid },
    include: "role",
  });
};

const getSpecificRoleUser = async ({ roleId }) => {
  return await User.findAll({
    where: { roleId },
    include: ["driver"],
  });
};

const deleteUser = async (user) => {
  return await user.destroy();
};

module.exports = {
  createUser,
  getUserByName,
  getUserByUuid,
  getSpecificRoleUser,
  deleteUser,
};
