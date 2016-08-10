var request = require('request');

exports.searchYelp = function(searchTerm, location) {
 request.get('https://api.yelp.com/v2/search?term=' + searchTerm + '&location=' + location, function(err, res, body){
    body = JSON.parse(body);
    return body;
 });
};


// Consumer Key  VahMky6elAwbERS2sapTTQ
// Consumer Secret iC3WTOgyny37x9qjt7nAfWzWr6U
// Token kqnSexVLThHXdcgQfocBVNhwxX03IcZJ
// Token Secret  0vU63-lLq2tdmL2l9UYFoh_S9Mo