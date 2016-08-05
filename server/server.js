var express = require('express');
var db = require('./db');
var path = require('path');

// // Middleware
// var morgan = require('morgan');
var bodyParser = require('body-parser');

// Router
var router = require('../server/route.js');

var app = express();
module.exports.app = app;

// // Logging and parsing
// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/', router);
app.use(express.static(path.join(__dirname, '/../client')));


var port = process.env.PORT || 9000;

app.listen(port, function() {
  console.log('server up and running on port ' + port);
});
