var models = require('../models');

module.exports = {
  users: {
    get: function(req, res) {
      models.users.get(function(err, results) {
        if(err) {
          console.log(err)
        } else {
          res.json(results);
        }
      });
    },
    post: function(req, res) {
      var params = [req.body.username];
      models.users.post(params, function(err, results) {
        if(err) {
          console.log(err);
        }
        res.sendStatus(201);
      });
    }
  }
}