const Sequelize = require('sequelize');

// *******  NOTE! ******** //
// Replace database credentials/host below with your database credentials/host

const sequelize = new Sequelize('5700braydencorbridge','5700braydencorbridge','A01885792', {
  dialect: 'mysql',
  host: 'hsb-web-dev.ckm1cfmd3i4j.us-west-2.rds.amazonaws.com'
});

module.exports = sequelize;
