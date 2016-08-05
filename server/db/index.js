var Sequelize = require('sequelize');

var db = new Sequelize(process.env.CLEARDB_DATABASE_URL || 'mysql://hoot:hoot@localhost/hoot');

//define models we need
var User = db.define('User', {
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING
});

User.sync();

exports.User = User;
