var express = require('express');
var path = require('path');
var http = require('http');
var socketHandler = require('./socketHandler');
var redditController = require('./reddit/redditController.js');
var fs = require('fs');
var formidable = require('formidable'),
http = require('http'),
util = require('util');

// // Middleware
// var morgan = require('morgan');
var bodyParser = require('body-parser');

// Router
var router = require('./config/route.js');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/', router);
app.use(express.static(path.join(__dirname, '/../client')));

var path = require('path'),
    fs = require('fs');

app.post('/upload', function (req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {

      fs.readFile(files.displayImage.path, function(err,data) {
          if(err) {
            console.log(err);
          }else {
            fs.writeFile(__dirname + '/../client/uploads/' + Math.random().toString() + '.png', data);
          }
      })
    });
    return;
  };
});

// fs.readFile, fs.writeFile

io.on('connection', socketHandler.newConnection);

var port = process.env.PORT || 9000;

server.listen(port, function() {
  console.log('server up and running on port ' + port);
});

module.exports = {
  app: app,
  io: io
}
