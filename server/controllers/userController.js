var db = require('../db');
var jwt = require('jsonwebtoken');

module.exports = {
  users: {
    signin: function(req, res) {
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
                                  'id': user.id ,
                                  'email': user.email} );
          }else{
            console.log('wrong password');
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
      db.User.findOrCreate({where: {email : req.body.email}, defaults: {firstname: req.body.firstname,lastname: req.body.lastname, password: req.body.password, isActive: false }})
      .spread(function(user, created) {
        res.json(user);
      });
    }
  }
};
