// Use Sequelize to connect to database
const Sequelize = require('sequelize');

// Create a new swquelize instance
const sequelize = new Sequelize('5700braydencorbridge_bistrosequelize', '5700braydencorbridge', 'A01885792', {
  dialect: 'mysql',
  host: "hsb-web-dev.ckm1cfmd3i4j.us-west-2.rds.amazonaws.com"
});

// Export sequelize instance
module.exports = sequelize;