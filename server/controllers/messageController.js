var db = require('../db');

module.exports = {
  message: {
      get: function(req, res) {
        var user = req.decoded;

        db.Message.getRecent(user.id)
          .then(function(messages) {
            res.json(messages);
          })
      },
      post: function(req, res) {
        db.Message.findOrCreate({where: {body: req.body.body,senderId: req.body.senderId, parentMessageId: req.body.parentMessageId, originChannelId: req.body.originChannelId }})
        .spread(function(message, created) {
          res.json(message);
        });
      }
    },
    table: {
      get: function(req, res) {
        db.Table.findAll()
        .then(function(tables) {
          res.json(tables);
        });
      },
      post: function(req, res) {
        db.Table.findOrCreate({where: {name: req.body.name }})
        .spread(function(table, created) {
          res.json(table);
        });
      }
  }
}