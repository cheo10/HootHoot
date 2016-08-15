var express = require('express');
var path = require('path');
var http = require('http');
var socketHandler = require('./socketHandler');

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

io.on('connection', socketHandler.newConnection);

var port = process.env.PORT || 9000;

server.listen(port, function() {
  console.log('server up and running on port ' + port);
});

module.exports = {
  app: app,
  io: io
}
