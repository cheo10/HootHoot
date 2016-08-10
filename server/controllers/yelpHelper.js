var request = require('request');

exports.searchYelp = function(searchTerm, location) {
 request.get('https://api.yelp.com/v2/search?term=' + searchTerm + '&location=' + location, function(err, res, body){
    body = JSON.parse(body);
    return body;
 });
};