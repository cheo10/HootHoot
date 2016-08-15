var GroupRoomModel = require('./groupRoomModel.js')

module.exports = {
  groupRoom: {
    get: function(req, res) {
      GroupRoomModel.GroupRoom.findAll()
      .then(function(groups) {
        res.json(groups);
      });
    },
    post: function(req, res) {
      GroupRoomModel.GroupRoom.findOrCreate({where: {name: req.body.name, isActive: req.body.isActive }})
      .spread(function(groups, created) {
        res.json(groups);
      });
    }
  }
}
