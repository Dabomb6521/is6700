const mysql = require('mysql2');

const pool = mysql.createPool({
  host: "hsb-web-dev.ckm1cfmd3i4j.us-west-2.rds.amazonaws.com",
  user: "5700braydencorbridge",
  database: "5700braydencorbridge",
  password: "A01885792",
});

module.exports = pool.promise();