// Simple Instagram API
//

var request = require('request'),
    crypto  = require('crypto'),
    querystring = require('querystring');

var api_url = 'https://api.instagram.com/v1';


var hmac = crypto.createHmac('SHA256', '68a89539375e43a6a24722a8d70c69c1');
    hmac.setEncoding('hex');
    hmac.write('127.0.0.1');
    hmac.end();
var hash = hmac.read();

var instagram = function(path, options, callback) {

  var user_id = '';
  var tokens   = path.match(/:[^\/]+/g);
  var method = options.method || 'get';

  if( typeof options === 'function' ) {
    callback = options;
    options = {};
  }

  delete options.method;

  tokens && tokens.forEach(function (token) {
      var key = token.substr(1);
      path = path.replace(token, options[key]);
      delete options[key];
  });

  if( Object.keys(options).length ) {
    path += '/?' + querystring.stringify(options);
  }

  var header_value = '127.0.0.1|' + hash;

  request({
    url: api_url + path,
    json: true,
    headers: {
      'X-Insta-Forwarded-For': header_value
    }
  }, function (err, response, body) { callback(err, body); });

};

module.exports = instagram;