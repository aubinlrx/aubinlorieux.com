'use strict';

//Dependencies
var app = require('../');
var logger = require('winston');
var config = require('../application/configs/config');

app.listen(config.PORT);
logger.info('serveur listening on port ' + config.PORT);


