var db = require('../db');
var jwt = require('jsonwebtoken');

module.exports = {
  users: {
    signin: function(req, res) {
      console.log('signing in ')
      console.log(req.body);
      db.User.findOne({where:{ email: req.body.email }})
      .then(function(user) {
        if(!user){
          res.json('User not found');
        }else{
          if(user.validPassword(req.body.password, user.password)){
            var myToken = jwt.sign({ user: user.email, id: user.id},
                                    'secret',
                                    {expiresIn: 24 * 60 * 60 });
            res.status(200).send({'token': myToken,
                                  'id': user.id } );
          }else{
            console.log('wrong password')
            res.json('Wrong password');
          }
        }
      })
      .catch(function(err) {
        console.log(err);
        res.status(400).send('Error finding user: ');
      });
    },

    authin: function(req, res) {
      console.log('authin in ')
      console.log(req.body , ' req.body.email')
      db.User.findOrCreate({where:{ email: req.body.email }, defaults: {firstname: req.body.firstname, lastname: req.body.lastname}})
      .spread(function(user, created) {
        var myToken = jwt.sign({ user: user.email, id: user.id},
                                'secret',
                                {expiresIn: 24 * 60 * 60 });
        res.status(200).send({'token': myToken,
                              'id': user.id } );

      })
      .catch(function(err) {
        console.log(err);
        res.status(400).send('Error', err);
      });
    },

    get: function(req, res) {
      db.User.findAll()
      .then(function(users) {
        res.json(users);
      });
    },
    post: function(req, res) {
      console.log(req.body);
      db.User.findOrCreate({where: {email : req.body.email}, defaults: {firstname: req.body.firstname,lastname: req.body.lastname, password: req.body.password}} )
      .spread(function(user, created) {
        res.json(user);
      });
    }
  },
  message: {
    get: function(req, res) {
      var user = req.decoded;

      db.Message.getRecent(user.id)
        .then(function(messages) {
          res.json(messages);
        })
    },
    post: function(req, res) {
      console.log(req.body);
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
      console.log(req.body);
      db.Table.findOrCreate({where: {name: req.body.name }})
      .spread(function(table, created) {
        res.json(table);
      });
    }
  },
  groupRoom: {
    get: function(req, res) {
      db.GroupRoom.findAll()
      .then(function(groups) {
        res.json(groups);
      });
    },
    post: function(req, res) {
      console.log(req.body);
      db.GroupRoom.findOrCreate({where: {name: req.body.name, isActive: req.body.isActive }})
      .spread(function(groups, created) {
        res.json(groups);
      });
    }
  },
  contacts: {
  get: function(req, res) {
    var user = req.decoded;

    db.Contacts.getContacts(user.id)
    .then(function(contacts) {
      res.json(contacts);
    });
  },
  post: function(req, res) {
    var user = req.decoded;

    db.Contacts.addContact(user.id, req.body.newContactEmail)
      .then(function(createdContact) {
        res.json(createdContact);
      })
  },
  delete: function(req, res) {
    var user = req.decoded;

    db.Contacts.deleteContact(user.id, req.body.contact)
      .then(function(deletedContact) {
        res.json(deletedContact);
      });
  }
}
};
