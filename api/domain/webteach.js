'use strict';

var Q = require('q');
var _ = require('lodash'),
    dbconfig = require('../../config/db'),
    // mysql = require('../helpers/db/db'),
    mysql = require('mysql'),
    Logger = require('bunyan');
const uuidv4 = require('uuid/v4');

var log = new Logger.createLogger({
    name: 'webteach-service',
    serializers: { req: Logger.stdSerializers.req }
});

var con = mysql.createConnection({
    host: dbconfig.mysql.host,
    // port: dbconfig.mysql.port,
    user: dbconfig.mysql.user,
    password: dbconfig.mysql.password,
    database: dbconfig.mysql.db
});


webteach.prototype.data = {}

function webteach(data) {
    webteach.prototype.data = data;
}

webteach.prototype.getData = function() {
    return webteach.prototype.data;
}

webteach.prototype.get = function(name) {
    return this.data[name];
}

webteach.prototype.set = function(name, value) {
    this.data[name] = value;
}

webteach.prototype.userLogin = (cb) => {
    var response = {
        "statusCode": 404,
        "message": "Invalid Data"
    }
    var sql = "SELECT * FROM userdetails WHERE user_name= '" + webteach.prototype.data.userName + "' and password= '" + webteach.prototype.data.password + "'";
    con.query(sql, function(err, result) {
        if (err) throw err;
        if (result && result.length > 0) {
            cb(null, new webteach("logged"));
        } else {
            cb(response);
        }
    });

}

webteach.prototype.userSignup = (cb) => {
    var response = {
        "statusCode": 404,
        "message": "Invalid Data"
    }
    var sql = "INSERT into userdetails values('" + webteach.prototype.data.userName + "','" + webteach.prototype.data.password + "','" + webteach.prototype.data.designation + "','" + webteach.prototype.data.organization + "','" + webteach.prototype.data.email + "')";
    console.log(sql);
    con.query(sql, function(err, result) {
        if (err) {
            cb(response);
        } else {
            cb(null, new webteach("logged"));
        }
    });

}

module.exports = webteach;