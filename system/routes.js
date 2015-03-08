'use strict';

var fs      = require('fs'),
    path    = require('path');

module.exports = function( app ) {

    fs.readdirSync(app.settings.routes).forEach(function(file) {

        if( file === 'readme.md') return;

        var filePath = path.join(app.settings.routes, file);
        var filePathCtrl = path.join(app.settings.controllers, file); 
        if( filePath !== __filename )
        {
            var baseFilename = path.basename(file, path.extname(file));
            var route = path.join(app.settings.routes, baseFilename);
            
            //Load controller if exist
            var controller = false;
            if( fs.existsSync(filePathCtrl) )
            {
               var baseFilenameCtrl = path.basename(file, path.extname(file));
               controller = path.join(app.settings.controllers, baseFilenameCtrl);
            }

            return require(route)(app, require(controller));
        }
    });

}