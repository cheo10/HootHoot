var express = require('express');
var mysql = require('mysql');

// var db = require('./db');

// // Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
// var router = require('./routes.js');

var app = express();

var connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-04.cleardb.net',
  user: 'b5cb560c0292c4',
  password: 'd9b6a43b',
  database: 'heroku_7d6d03d0a895c93'
});

connection.connect();

// // Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());
app.use(express.static(__dirname + '/'));


var port = process.env.PORT || 9000;

app.listen(port, function() {
  console.log('server up and running on port ' + port);
});
