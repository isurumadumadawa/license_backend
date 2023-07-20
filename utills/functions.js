const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { APP_SECRET } = require("../config/settings");

//Utility functions
//Generate Salt
const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};
//Generate Password
const GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};
//Validate pasword
const ValidatePassword = async (enteredPassword, savedPassword, salt) => {
  return (await GeneratePassword(enteredPassword, salt)) === savedPassword;
};
//Generate token
const GenerateToken = async ({ uuid, userName, roleId, role }) => {
  const token = jwt.sign(
    {
      uuid,
      userName,
      roleId,
      role,
    },
    APP_SECRET
  );
  return token;
};
//Validate Token
const ValidateToken = async (req) => {
  const signature = req.header("x-auth-token");

  if (signature) {
    const payload = await jwt.verify(signature, APP_SECRET);
    req.user = payload;
    return true;
  }

  return false;
};

const FormateData = (data) => {
  if (data) {
    return { data, status: "Success" };
  } else {
    throw new Error("Data Not found!");
  }
};

module.exports = {
  GenerateSalt,
  GeneratePassword,
  ValidatePassword,
  GenerateToken,
  ValidateToken,
  FormateData,
};
