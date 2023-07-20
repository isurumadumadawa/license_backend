const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT,
  APP_SECRET: process.env.APP_SECRET,
};
