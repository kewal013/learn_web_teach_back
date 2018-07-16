'use strict';

var WebTeach = require('../domain/webteach'),
    Logger = require('bunyan');
const uuidv4 = require('uuid/v4');


var log = new Logger.createLogger({
    name: 'webteach-service',
    serializers: { req: Logger.stdSerializers.req }
});

module.exports = {
    userLogin: userLogin,
    userSignup: userSignup,
    getAllBlogs: getAllBlogs,
    getUserBlogs: getUserBlogs
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
                res.json(content);
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
                res.json(content);
            }
        });
}

function getAllBlogs(req, res) {
    (new WebTeach()).getAllBlogs(
        function(err, content) {
            if (err) {
                res.writeHead(err.statusCode, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(err));
                log.error("TraceId : %s, Error : %s", JSON.stringify(err));
            } else if (content) {
                res.set('Content-Type', 'application/json');
                res.json(content);
            }
        });
}

function getUserBlogs(req, res) {
    var username = req.swagger.params.username.value;
    (new WebTeach()).getUserBlogs(username,
        function(err, content) {
            if (err) {
                res.writeHead(err.statusCode, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(err));
                log.error("TraceId : %s, Error : %s", JSON.stringify(err));
            } else if (content) {
                res.set('Content-Type', 'application/json');
                res.json(content);
            }
        });
}