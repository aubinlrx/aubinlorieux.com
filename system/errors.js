'use strict'

var Errors = function( app ) {

    //Check env is 'test'
    var test = app.get('env') == 'test';

    /**
    * Handling 404 error
    */
    app.use(function (req, res, next) {
        res.status(404);

        // respond with html page
        if( req.accepts('html') ) {
            res.render('404', {url: req.url});
            return;
        }

        // respond with json
        if( req.accepts('json') ) {
            res.send({error: 'Not found'});
            return;
        }

        // default plain text
        res.type('txt').send('Not found');
    });

    /**
    * Handling 500 error
    */
    app.use(function (err, req, res, next) {
        if(!test) console.error(err.stack);

        if( req.accepts('html') ) {
            res.render('500', {url: req.url, error: err.stack});
            return;
        }

        // respond with json
        if( req.accepts('json') ) {
            res.send({error: 'Internal server Error'});
            return;
        }

        //Respond with 500 "Internal server Error"
        res.send(500);
    });

};

module.exports = Errors;