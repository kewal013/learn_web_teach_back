'use strict';

var dbconfig = require('../../../config/db');

var mysql = require('mysql');

module.exports = {
    connection: connection
};


function connection() {
    var con = mysql.createConnection({
        host: dbconfig.mysql.host,
        // port: dbconfig.mysql.port,
        user: dbconfig.mysql.user,
        password: dbconfig.mysql.password
    });
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var createDatabase = "CREATE DATABASE " + dbconfig.mysql.db;
        con.query(createDatabase, function(err, result) {
            if (err) {
                console.log("Database exist");
                // dbconfig.tables.forEach(function(data) {
                //     // createtable(con, data.table);
                // })
            } else {
                console.log("Database created");
                // dbconfig.tables.forEach(function(data) {
                //     createtable(con, data.table);
                // })
            }
        });
    });
};

function createtable(con, tableName) {
    var createTable = "CREATE TABLE " + tableName;
    con.query(createTable, function(err, result) {
        if (err) {
            console.log("Table exist");
        } else {
            console.log("Table created");
        }
    });
}