var oauthSignature = require('oauth-signature');
var n = require('nonce')();
var request = require('request');
var qs = require('querystring');
var _ = require('lodash');


exports.searchYelp = function(set_parameters, callback) {
/* Function for yelp call
 * ------------------------
 * set_parameters: object with params to search
 * callback: callback(error, response, body)
 */
  /* The type of request */
  var httpMethod = 'GET';

  /* The url we are using for the request */
  var url = 'http://api.yelp.com/v2/search';

  /* We can setup default parameters here */
  var default_parameters = {
    location: 'San+Francisco',
    sort: '2'
  };

  /* We set the require parameters here */
  var required_parameters = {
    oauth_consumer_key : process.env.oauth_consumer_key || "VahMky6elAwbERS2sapTTQ",
    oauth_token : process.env.oauth_token || "kqnSexVLThHXdcgQfocBVNhwxX03IcZJ",
    oauth_nonce : n(),
    oauth_timestamp : n().toString().substr(0,10),
    oauth_signature_method : 'HMAC-SHA1',
    oauth_version : '1.0'
  };

  /* We combine all the parameters in order of importance */
  var parameters = _.assign(default_parameters, set_parameters, required_parameters);

  /* We set our secrets here */
  var consumerSecret = process.env.consumerSecret || "iC3WTOgyny37x9qjt7nAfWzWr6U";
  var tokenSecret = process.env.tokenSecret || "kqnSexVLThHXdcgQfocBVNhwxX03IcZJ";

  /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
  /* Note: This signature is only good for 300 seconds after the oauth_timestamp */
  var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

  /* We add the signature to the list of paramters */
  parameters.oauth_signature = signature;

  /* Then we turn the paramters object, to a query string */
  var paramURL = qs.stringify(parameters);

  /* Add the query string to the url */
  var apiURL = url+'?'+paramURL;

  /* Then we use request to send make the API Request */
  request(apiURL, function(error, response, body){
    return callback(error, response, body);
  });

};
// {
//   "oauth_consumer_key": "VahMky6elAwbERS2sapTTQ",
//   "consumer_secret": "iC3WTOgyny37x9qjt7nAfWzWr6U",
//   "oauth_signature_method": "HMAC-SHA1",
//   "oauth_token": "kqnSexVLThHXdcgQfocBVNhwxX03IcZJ",
//   "oauth_signature": "0vU63-lLq2tdmL2l9UYFoh_S9Mo",
//   "oauth_timestamp": 1470874763,
//   "oauth_nonce": "poop"
// }

// Consumer Key  VahMky6elAwbERS2sapTTQ
// Consumer Secret iC3WTOgyny37x9qjt7nAfWzWr6U
// Token kqnSexVLThHXdcgQfocBVNhwxX03IcZJ
// Token Secret  0vU63-lLq2tdmL2l9UYFoh_S9Mo
