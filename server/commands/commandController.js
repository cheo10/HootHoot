var Commands = require('./commandModel.js');
var storedCommands = {};

Commands.findAll({ raw: true })
  .then(function(commands) {
    commands.forEach(function(command) {
      storedCommands[command.name] = command;
    })
  });

module.exports = {
  commands: {
    get: function(req, res) {
      res.json(storedCommands);
    },
    post: function(req, res) {
      Commands.findOrCreate({where: {name: req.body.name},
        defaults: {description: req.body.description, parameters: req.body.parameters, postUrl: req.body.postUrl} })
        .spread(function(command, created) {
          storedCommands[command.name] = command;
          res.json(command);
        });
    }
  }
}
