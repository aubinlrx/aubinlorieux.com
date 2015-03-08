'use strict';

//Configs
var config  = require('../application/configs/config');
var path    = require('path');
var moment  = require('moment');
var _       = require('lodash');

var Helpers = function( app ) {

    //Base url implementation
    app.use(function(req, res, next) {
        console.log(req.protocol);
        res.locals.base_url = function(url) {
            var base_url = req.baseUrl,
                port     = config.PORT,
                host     = req.host,
                protocol = if(config.SSL) ? 'https' : req.protocol;

            var suffix = protocol + "://" + host + ":" + port;
            
            if( base_url.trim() !== '' )
            {
                suffix += '/' + base_url
            }

            return suffix + url;
        }

        res.locals.moment = moment;
        res.locals._      = _;

        next();

    });

};

module.exports = Helpers;