var mysql = require('mysql');

var connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'hoot'
});

connection.connect();

module.exports = connection;


