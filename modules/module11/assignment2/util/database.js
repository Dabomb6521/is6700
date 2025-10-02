const Sequelize = require('sequelize');

// *******  NOTE! ******** //
// Replace database credentials/host below with your database credentials/host

const sequelize = new Sequelize('YOUR_DB_NAME_HERE', 'YOUR_USER_NAME_HERE', 'YOUR_PASSWORD_HERE', {
  dialect: 'mysql',
  host: 'hsb-web-dev.ckm1cfmd3i4j.us-west-2.rds.amazonaws.com'
});

module.exports = sequelize;
