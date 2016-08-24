var request = require('request');

function weather(req,res){

  req.body.location = req.body.location.replace(/\s+/g, '');
  request('http://api.openweathermap.org/data/2.5/weather?q=' + req.body.location + '&APPID=6a80ac1b8d42f26414a494d1e7c51ebb', function(error, response, body) {

    var temp = JSON.parse(body).main.humidity.toString();
    res.json({ text: temp });
  })
}

module.exports = {weather};
