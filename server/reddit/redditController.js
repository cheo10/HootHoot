var request = require('request');

function reddit(req,res){
 request('https://www.reddit.com/r/' + req.params.subreddit + '/.json?limit=1', function(error, response, body) {
    var ahh = JSON.parse(body);
    res.json(ahh);
  })
}

module.exports = {reddit};
