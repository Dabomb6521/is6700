const Sequelize = require("sequelize");


// Hosted AWS Instance
// const sequelize = new Sequelize(
//   "5700braydencorbridge_examproject",
//   "5700braydencorbridge",
//   "A01885792",
//   {
//     dialect: "mysql",
//     host: "hsb-web-dev.ckm1cfmd3i4j.us-west-2.rds.amazonaws.com",
//   }
// );


// Local Devcontainer
const sequelize = new Sequelize(
  "5700braydencorbridge_examproject",
  "devuser",
  "devpassword",
  {
    dialect: "mysql",
    host: "localhost",
    port: "3306"
  }
);


module.exports = sequelize;
