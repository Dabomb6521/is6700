var fs = require("fs");
var morgan = require("morgan");
var path = require("path");

var accessLogStream = fs.createWriteStream(path.join(__dirname, "logRequests.txt"), { flags: "a" });

const logRequests = morgan('dev', {stream: accessLogStream})

module.exports = logRequests;