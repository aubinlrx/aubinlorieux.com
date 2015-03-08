'use strict';

var siteRoute = function( app, controller ) {

  /**
   * Index
   */
  app.get('/', controller.index);

}

module.exports = siteRoute;