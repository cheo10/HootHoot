var userController = require('../user/userController.js');
var contactsController = require('../contacts/contactsController.js');
var groupRoomController = require('../group/groupRoomController.js');
var messageController = require('../message/messageController.js');
var Auth = require('../auth/helpers.js');
// var helpers = require('../controllers/yelpHelper');
var router = require('express').Router();

router.post('/', userController.users.signin);

router.post('/auth', userController.users.authin);

router.get('/signup', userController.users.get);

router.post('/signup', userController.users.post);

router.get('/message', Auth.authorize, messageController.message.get);

router.post('/message', Auth.authorize, messageController.message.post);

router.get('/groupRoom', Auth.authorize, groupRoomController.groupRoom.get);

router.post('/groupRoom', Auth.authorize, groupRoomController.groupRoom.post);

router.get('/contacts', Auth.authorize,contactsController.contacts.get);

router.post('/contacts', Auth.authorize,contactsController.contacts.post);

router.delete('/contacts', Auth.authorize, contactsController.contacts.delete);

router.post('/api/yelp', function(req,res){
  var params = req.body;
  helpers.searchYelp(params.searchTerm, function(data){
    res.json(data);
  });
});

module.exports = router;
