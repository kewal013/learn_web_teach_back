'use strict';

var WebTeach = require('../domain/webteach'),
    Logger = require('bunyan');
const uuidv4 = require('uuid/v4');
var nJwt = require('njwt');

var log = new Logger.createLogger({
    name: 'webteach-service',
    serializers: { req: Logger.stdSerializers.req }
});

module.exports = {
    userLogin: userLogin,
    userSignup: userSignup
};


function userLogin(req, res) {
    (new WebTeach(req.swagger.params.body.value)).userLogin(
        function(err, content) {
            if (err) {
                res.writeHead(err.statusCode, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(err));
                log.error("TraceId : %s, Error : %s", JSON.stringify(err));
            } else if (content) {
                res.set('Content-Type', 'application/json');
                generateToken(function(token) {
                    var data = {};
                    data.token = token;
                    res.json(data);
                })
            }
        });
}


function userSignup(req, res) {
    (new WebTeach(req.swagger.params.body.value)).userSignup(
        function(err, content) {
            if (err) {
                res.writeHead(err.statusCode, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(err));
                log.error("TraceId : %s, Error : %s", JSON.stringify(err));
            } else if (content) {
                res.set('Content-Type', 'application/json');
                generateToken(function(token) {
                    var data = {};
                    data.token = token;
                    res.json(data);
                })
            }
        });
}


function generateToken(cb) {
    var secretKey = process.env.TOKEN_KEY;
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

function verifyToken(token, cb) {
    var secretKey = process.env.TOKEN_KEY;
    nJwt.verify(token, secretKey, function(err, verifiedJwt) {
        if (err) {
            console.log(err); // Token has expired, has been tampered with, etc
            cb(false);
        } else {
            console.log(verifiedJwt); // Will contain the header and body
            cb(true);
        }
    });
}