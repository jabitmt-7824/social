const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accesLogStream = rfs.createStream("access.log",{
    interval: "1d",
    path: logDirectory
});

const development = {
    name: "development",
    db: "social_db_development",
}
const production = {
    name: "production",
    db: process.env.db
}
module.exports = eval(process.env.NODE_ENV) === undefined ? development : eval(process.env.NODE_ENV)
