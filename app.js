'use strict';

//LIBS
const dotenv = require('dotenv');
dotenv.load();
var SwaggerRestify = require('swagger-restify-mw');
var restify = require('restify');
var app = restify.createServer();
// var jwt = require('restify-jwt');
var nJwt = require('njwt');
var Logger = require('bunyan'),
    dbUtils = require('./api/helpers/db/db'),
    _ = require('lodash'),
    fs = require('fs');
var log = new Logger.createLogger({
    name: 'learnwebteach-service',
    serializers: { req: Logger.stdSerializers.req }
});

//GLOBALS
var app = restify.createServer({ log: log });

var port = process.env.PORT || 8090;



//app configs
app.use(restify.CORS());

app.opts(/.*/, function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
    res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
    res.send(200);
    return next();
});

app.use(restify.queryParser());
app.use(restify.bodyParser());
// app.use(jwt);
app.pre(function(req, res, next) {
    req.log.info({ req: req }, 'REQUEST');
    next();
});
app.listen(process.env.PORT || 10010);

//swagger config
var config = {
    appRoot: __dirname,
    swaggerSecurityHandlers: {
        UserSecurity: function(req, authOrSecDef, scopesOrApiKey, cb) {
            verifyToken(req.headers.authorization, function(err, result) {
                if (err) {
                    // res.end(err);
                    return cb(err);
                } else {
                    return cb(null);
                }
            });
        }
    }
};

function verifyToken(token, cb) {
    // var secretKey = process.env.TOKEN_KEY;
    var secretKey = fs.readFileSync('./config/cert.pem');
    // console.log(token);
    nJwt.verify(token, secretKey, function(err, verifiedJwt) {
        if (err) {
            // console.log(err); // Token has expired, has been tampered with, etc
            cb(err);
        } else {
            // console.log(verifiedJwt); // Will contain the header and body
            cb(null, true);
        }
    });
}


dbUtils.connection();

SwaggerRestify.create(config, function(err, swaggerRestify) {
    if (err) { throw err; }
    swaggerRestify.register(app);
    if (swaggerRestify.runner.swagger.paths['/swagger']) {
        console.log('try this:\ncurl http://127.0.0.1:%d/v2/components', port);
    }
});

module.exports = app; // for testing