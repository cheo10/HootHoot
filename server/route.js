var controller = require('./controllers');
var router = require('express').Router();
var Auth = require('./auth/helpers.js');
var helpers = require('./controllers/yelpHelper');

router.post('/', controller.users.signin);

router.post('/auth', controller.users.authin);

router.get('/signup', controller.users.get);

router.post('/signup', controller.users.post);

router.get('/message', Auth.authorize, controller.message.get);

router.post('/message', Auth.authorize, controller.message.post);

router.get('/groupRoom', Auth.authorize, controller.groupRoom.get);

router.post('/groupRoom', Auth.authorize, controller.groupRoom.post);

router.get('/contacts', Auth.authorize,controller.contacts.get);

router.post('/contacts', Auth.authorize,controller.contacts.post);

router.delete('/contacts', Auth.authorize, controller.contacts.delete);

router.post('/api/yelp', function(req,res){
  var params = req.body;
  helpers.searchYelp(params.searchParameter)
  .then(function(results) {
      return res.json(results);
    });
});

module.exports = router;
