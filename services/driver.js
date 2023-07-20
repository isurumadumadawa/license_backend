const { Driver, User } = require("../models");

const createDriver = async ({
  name,
  otherName,
  mobileNumber,
  gender,
  bloodType,
  address,
  dob,
  issuedDate,
  expireDate,
  image,
  userId,
}) => {
  return await Driver.create({
    name,
    otherName,
    mobileNumber,
    gender,
    bloodType,
    address,
    dob,
    issuedDate,
    expireDate,
    image,
    userId,
  });
};

const getDriver = async ({ uuid }) => {
  console.log("uuid", uuid);
  return await Driver.findOne({
    where: { uuid },
    include: "vehicles",
  });
};

const deleteDriver = async ({ driver }) => {
  return await driver.destroy();
};

module.exports = {
  createDriver,
  deleteDriver,
  getDriver,
};
