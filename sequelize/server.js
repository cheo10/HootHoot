var express = require('express');
var db = require('./db');
var mysql = require('mysql');
var path = require('path');

// // Middleware
// var morgan = require('morgan');
var bodyParser = require('body-parser');

// Router
var router = require('./route.js');

var app = express();
module.exports.app = app;

var localDbConnection = {
  host: 'localhost',
  user: 'hoot',
  password: 'hoot',
  database: 'hoot'
}

var connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL || localDbConnection);

connection.connect();

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
