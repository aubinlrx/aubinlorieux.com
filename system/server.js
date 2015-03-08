'use strict';

//Node modules
var path    = require('path');

//Express Midlewares
var express     = require('express'),
    bodyParser  = require('body-parser'),
    favicon     = require('serve-favicon'),
    serveStatic = require('serve-static');

//Configs
var config  = require('../application/configs/config');

module.exports = function( db, logger, root_path ) {

    var app = express();

    //To get POST body
    app.use( bodyParser.json() );
    app.use( bodyParser.urlencoded({
        extended: true
    }) );

    //Set view directory
    app.set('port', config.PORT);
    app.set('view engine', config.VIEW_ENGINE);
    app.set('views', path.join(root_path, config.VIEWS_PATH) );
    app.set('models', path.join(root_path, config.MODELS_PATH) );
    app.set('routes', path.join(root_path, config.ROUTES_PATH) );
    app.set('controllers', path.join(root_path, config.CONTROLLERS_PATH) );
    app.set('config', config);

    //Set assets
    app.use( favicon( path.join(root_path, 'assets/img/favicon.ico') ) );
    app.use('/assets', express.static(root_path + '/assets'));

    //Boostrap views helpers
    require('./helpers')(app);

    //Bootstrap routes
    require('./routes')(app);

    //Boostrap errors handling
    require('./errors')(app);

    //Bootstrap models
    require('./models')(app);

    return app;
};