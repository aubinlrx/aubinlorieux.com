/*jslint node: true */

'use strict';

//Dependencies
var express    = require('express');
var logger     = require('winston');
var mongoose   = require('mongoose');
var config     = require('./application/configs/config');

//Directory path
var root_path = __dirname;
var db = null;

//Catch all uncaught exception
process.on('uncaughtException', function (err) {

    logger.error('Something very bad happend', err.message);
    logger.error(err.stack);
    process.exit(1); // car on sait plus vraiment ou on en est.. C'est vraiment instable.. 

});

if( config.USE_DATABASE === true ) {

    //Boostrap db connection
    db = mongoose.connect(config.DB_URL);

    //Display When connected
    mongoose.connection.on('connected', function () {
        logger.info("Mongo connected to", config.DB_URL);
    });

    //Exit on db error
    mongoose.connection.on('error', function (err) {
        logger.error("mongodb error: " + err);
        process.exit(1);
    });

    //Retry 10 times on db connection lost
    var attempt = 1;
    mongoose.connection.on('disconnected', function () {

        if (attempt < 10) {
            logger.error("mongodb disconnected, trying to reconnect... ");
            logger.error("mongodb is trying to reconnect, attempt num " + attempt);
            attempt += 1;
        } else {
            logger.error("mongodb has giving up..");
        }
    });

}



var app = module.exports = require('./system/server')(db, logger, root_path);
