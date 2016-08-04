var express = require('express');
// var db = require('./db');

// // Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
// var router = require('./routes.js');

var app = express();

// // Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());
app.use(express.static(__dirname + '/'));

var port = 9000;

app.listen(port, function() {
  console.log('server up and running on port ' + port);
});