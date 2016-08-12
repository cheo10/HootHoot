var db = require('../db');

module.exports = {
  groupRoom: {
    get: function(req, res) {
      db.GroupRoom.findAll()
      .then(function(groups) {
        res.json(groups);
      });
    },
    post: function(req, res) {
      db.GroupRoom.findOrCreate({where: {name: req.body.name, isActive: req.body.isActive }})
      .spread(function(groups, created) {
        res.json(groups);
      });
    }
  }
}
