var Sequelize = require('sequelize');
var db = new Sequelize('hoot','root','');

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
