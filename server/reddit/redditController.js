var request = require('request');

function reddit(req,res){
 request('https://www.reddit.com/r/' + req.params.subreddit + '/.json?limit=1', function(error, response, body) {
    var redditJson = JSON.parse(body);
    res.json(redditJson);
  })
}

module.exports = {reddit};
