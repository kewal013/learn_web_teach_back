'use strict';

var Q = require('q');
var _ = require('lodash'),
    dbconfig = require('../../config/db'),
    // mysql = require('../helpers/db/db'),
    mysql = require('mysql'),
    Logger = require('bunyan');
const uuidv4 = require('uuid/v4');
var nJwt = require('njwt');
var fs = require('fs');

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
    con.query(sql, function(err, res) {
        if (err) {
            cb(response);
        } else {
            console.log(res);
            generateToken(function(data) {
                var result = {};
                result.token = data;
                result.user = res[0].user_name;
                cb(null, result);
            })
        }
    });

}

webteach.prototype.userSignup = (cb) => {
    var response = {
        "statusCode": 404,
        "message": "Invalid Data"
    }
    var sql = "INSERT into userdetails values('" + webteach.prototype.data.userName + "','" + webteach.prototype.data.password + "','" + webteach.prototype.data.email + "')";
    console.log(sql);
    con.query(sql, function(err, res) {
        if (err) {
            cb(response);
        } else {
            generateToken(function(data) {
                var result = {};
                result.token = data;
                result.user = webteach.prototype.data.userName;
                cb(null, result);
            })
        }
    });

}

webteach.prototype.getAllBlogs = (cb) => {
    var response = {
        "statusCode": 404,
        "message": "Invalid Data"
    }
    var sql = "SELECT * FROM blogdata";
    console.log(sql);
    con.query(sql, function(err, res) {
        if (err) {
            cb(response);
        } else {
            cb(null, res);
        }
    });

}

webteach.prototype.getUserBlogs = (username, cb) => {
    var response = {
            "statusCode": 404,
            "message": "Invalid Data"
        }
        // var userName = new String(username);
    var sql = "SELECT * FROM blogdata WHERE content_published_by = '" + username + "'";
    console.log(sql);
    con.query(sql, function(err, res) {
        console.log(err);
        if (err) {
            cb(response);
        } else {
            cb(null, res);
        }
    });

}

function generateToken(cb) {
    // var secretKey = process.env.TOKEN_KEY;
    var secretKey = fs.readFileSync('./config/cert.pem');
    var claims = {
        sub: 'user9876',
        iss: 'https://mytrustyapp.com',
        permissions: 'upload-photos'
    }
    var jwt = nJwt.create(claims, secretKey);
    var token = jwt.compact();
    console.log(token);
    cb(token);
}

// function verifyToken(token, cb) {
//     var secretKey = process.env.TOKEN_KEY;
//     nJwt.verify(token, secretKey, function(err, verifiedJwt) {
//         if (err) {
//             console.log(err); // Token has expired, has been tampered with, etc
//             cb(false);
//         } else {
//             console.log(verifiedJwt); // Will contain the header and body
//             cb(true);
//         }
//     });
// }

webteach.prototype.saveBlogData = (cb) => {
    var response = {
        "statusCode": 404,
        "message": "Invalid Data"
    }
    webteach.prototype.data.content_id = uuidv4();
    var sql = "INSERT into blogdata values('" + webteach.prototype.data.content_id + "','" + webteach.prototype.data.content_title + "','" + webteach.prototype.data.content_url + "','" + webteach.prototype.data.content + "','" + webteach.prototype.data.content_published_by + "','" + webteach.prototype.data.content_published_on + "','" + webteach.prototype.data.content_technology + "','" + webteach.prototype.data.content_tag + "','" + webteach.prototype.data.blog_image + "')";
    console.log(sql);
    con.query(sql, function(err, res) {
        if (err) {
            cb(response);
        } else {
            cb(null, res);
        }
    });

}

webteach.prototype.updateBlogData = (blogId, cb) => {
    var response = {
            "statusCode": 404,
            "message": "Invalid Data"
        }
        // webteach.prototype.data.content_id = uuidv4();
        // var sql = "UPDATE into userdetails WHERE content_id = '" + blogId + "' values('" + webteach.prototype.data.content_id + "','" + webteach.prototype.data.content_title + "','" + webteach.prototype.data.content_url + "','" + webteach.prototype.data.content + "','" + webteach.prototype.data.content_published_by + "','" + webteach.prototype.data.content_published_on + "','" + webteach.prototype.data.content_technology + "','" + webteach.prototype.data.content_tag + "','" + webteach.prototype.data.blog_image + "')";

    var sql = "UPDATE blogdata SET content_title = '" + webteach.prototype.data.content_title + "', content = '" + webteach.prototype.data.content + "' WHERE content_id ='" + blogId + "'";
    console.log(sql);
    con.query(sql, function(err, res) {
        if (err) {
            cb(response);
        } else {
            cb(null, res);
        }
    });

}

webteach.prototype.getBlogData = (blogId, cb) => {
    var response = {
            "statusCode": 404,
            "message": "Invalid Data"
        }
        // webteach.prototype.data.content_id = uuidv4();
    var sql = "SELECT * FROM blogdata WHERE content_id = '" + blogId + "'";

    console.log(sql);
    con.query(sql, function(err, res) {
        if (err) {
            cb(response);
        } else {
            cb(null, res);
        }
    });

}

webteach.prototype.deleteBlogData = (blogId, cb) => {
    var response = {
            "statusCode": 404,
            "message": "Invalid Data"
        }
        // webteach.prototype.data.content_id = uuidv4();
    var sql = "DELETE FROM blogdata WHERE content_id = '" + blogId + "'";

    console.log(sql);
    con.query(sql, function(err, res) {
        if (err) {
            cb(response);
        } else {
            cb(null, res);
        }
    });

}

module.exports = webteach;