'use strict';

//LIBS
const dotenv = require('dotenv');
dotenv.load();
var SwaggerRestify = require('swagger-restify-mw');
var restify = require('restify');
var app = restify.createServer();
var jwt = require('restify-jwt');
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
            jwt(req, req.res, function(err) {
                return cb(null);
            });
        }
    }
};


dbUtils.connection();

SwaggerRestify.create(config, function(err, swaggerRestify) {
    if (err) { throw err; }
    swaggerRestify.register(app);
    if (swaggerRestify.runner.swagger.paths['/swagger']) {
        console.log('try this:\ncurl http://127.0.0.1:%d/v2/components/learn_web_teach', port);
    }
});

module.exports = app; // for testing