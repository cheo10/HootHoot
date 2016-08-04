var express = require('express');
var mysql = require('mysql');
var path = require('path')

// var db = require('./db');

// // Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
// var router = require('./routes.js');

var app = express();

var localDbConnection = {
  host: 'localhost',
  user: 'hoot',
  password: 'hoot',
  database: 'hootDev'
}

var connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL || localDbConnection);

connection.connect();

// // Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());
app.use(express.static(path.join(__dirname, '/../client')));


var port = process.env.PORT || 9000;

app.listen(port, function() {
  console.log('server up and running on port ' + port);
});
