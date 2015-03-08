'use strict';

var fs              = require('fs'),
    path            = require('path'),
    _               = require('lodash'),
    stringHelper    = require('./helpers/string_helper');

module.exports = function( app ) {
    
    fs.readdirSync(app.settings.models).forEach(function(file) {

        if( file === 'readme.md' ) return;

        var filePath = path.join(app.settings.models, file);
        if( filePath !== __filename )
        {
            var baseFilename = path.basename(file, path.extname(file));
            var model = path.join(app.settings.models, baseFilename);

            if( typeof global[baseFilename] === 'undefined' )
            {

                var arr = baseFilename.split('_');

                var modelName = _.reduce(stringHelper.arrToUcFirst(arr), function(result, n, i) {
                    return result + n;
                });

                return global[modelName] = require(model);
            }
            else
            {
                console.log('Can\t load model: ['+ baseFilename +'] already exist');
            }
        }
    });

};