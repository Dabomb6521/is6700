const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "5700braydencorbridge_examproject",
  "5700braydencorbridge",
  "A01885792",
  {
    dialect: "mysql",
    host: "hsb-web-dev.ckm1cfmd3i4j.us-west-2.rds.amazonaws.com",
  }
);

module.exports = sequelize;
