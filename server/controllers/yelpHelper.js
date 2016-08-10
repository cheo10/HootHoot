var request = require('request');

exports.searchYelp = function(searchTerm, location) {
// Request API access: http://www.yelp.com/developers/getting_started/api_access
  var Yelp = require('yelp');

  var yelp = new Yelp({
    consumer_key: 'VahMky6elAwbERS2sapTTQ',
    consumer_secret: 'iC3WTOgyny37x9qjt7nAfWzWr6U',
    token: 'kqnSexVLThHXdcgQfocBVNhwxX03IcZJ',
    token_secret: '0vU63-lLq2tdmL2l9UYFoh_S9Mo',
  });

  // See http://www.yelp.com/developers/documentation/v2/search_api
  yelp.search({ term: searchTerm, location: location })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.error(err);
  });
};


// Consumer Key  VahMky6elAwbERS2sapTTQ
// Consumer Secret iC3WTOgyny37x9qjt7nAfWzWr6U
// Token kqnSexVLThHXdcgQfocBVNhwxX03IcZJ
// Token Secret  0vU63-lLq2tdmL2l9UYFoh_S9Mo
