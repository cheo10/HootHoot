var db = require('../db');

module.exports = {
  users: {
    get: function(req, res) {
      db.User.findAll()
      .then(function(users) {
        res.json(users);
      });
    },
    post: function(req, res) {
      console.log(req.body);
      db.User.findOrCreate({where: {firstname: req.body.firstname,lastname: req.body.lastname, username: req.body.username, email: req.body.email, password: req.body.password, }})
      .spread(function(user, created) {
        res.sendStatus(created ? 201: 200);
      });
    }
  }
};
