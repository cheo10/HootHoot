var request = require('request');

function weather(req,res){
 request('http://api.openweathermap.org/data/2.5/weather?zip=' + req.body.zipcode + ',us&APPID=6a80ac1b8d42f26414a494d1e7c51ebb', function(error, response, body) {
  console.log(error, '$$$')
  console.log(response, '###')
  console.log(body, '%%%')
    // var temp = body.main.humidity;
    // console.log(temp)
    var temp = JSON.parse(body).main.humidity
    res.json({ text: temp });
  })
}

module.exports = {weather};
