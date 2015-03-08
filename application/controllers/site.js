'use strict';

/**
 * Module dependencies
 */
var instagram = require('../helpers/instagram');
var _ = require('lodash');

var siteController = {

  /**
   * Site Index
   */
  index: function(req, res) {

    var options = {
      'user': '3044754',
      'access_token': '3044754.e710a9a.5cd353ef18ec489cb220f7bd67356267',
      'count': 4
    };

    instagram('/users/:user/media/recent', options, function(err, data) {

      if( err ) return res.send(err);

      var images = [];

      _.forEach(data.data, function(value, key) {

        images.push(value.images.low_resolution.url);

      });

      return res.render('../views/site/index', {images: images});
    });

  }
};

module.exports = siteController;