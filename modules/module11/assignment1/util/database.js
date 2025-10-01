const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'hsb-web-dev.ckm1cfmd3i4j.us-west-2.rds.amazonaws.com',
    user: 'YOUR_USER_NAME_HERE',
    database: 'YOUR_DB_NAME_HERE',
    password: 'YOUR_PASSWORD_HERE'
});

module.exports = pool.promise();