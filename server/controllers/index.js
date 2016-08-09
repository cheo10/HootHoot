var db = require('../db');
var jwt = require('jsonwebtoken');

module.exports = {
  users: {
    signin: function(req, res) {
      console.log(req.body);
      db.User.findOne({where:{ username: req.body.username }})
      .then(function(user) {
        if(!user){
          res.json('User not found');
        }else{
          if(user.validPassword(req.body.password, user.password)){
            var myToken = jwt.sign({ user: user.id},
                                    'secret',
                                    {expiresIn: 24 * 60 * 60 });
            res.status(200).send({'token': myToken,
                                  'id': user.id,
                                  'username': user.username } );
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
        res.json(user);
      });
    }
  },
  message: {
    get: function(req, res) {
      db.Message.findAll()
      .then(function(messages) {
        res.json(messages);
      });
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
    db.Contacts.findAll()
    .then(function(contacts) {
      res.json(contacts);
    });
  },
  post: function(req, res) {
    console.log(req.body);
    db.Contacts.findOrCreate({where: {userOne: req.body.userOne, userTwo:req.body.userTwo}})
    .spread(function(contacts, created) {
      res.json(contacts);
    });
  }
}
};
