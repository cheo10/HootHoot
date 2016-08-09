var controller = require('./controllers');
var router = require('express').Router();
var Auth = require('./auth/helpers.js');


router.post('/', controller.users.signin);

router.post('/auth', controller.users.authin)

router.get('/signup', controller.users.get);

router.post('/signup', controller.users.post);

router.get('/message', Auth.authorize, controller.message.get);

router.post('/message', Auth.authorize, controller.message.post);

router.get('/table', Auth.authorize, controller.table.get);

router.post('/table', Auth.authorize, controller.table.post);

router.get('/groupRoom', Auth.authorize, controller.groupRoom.get);

router.post('/groupRoom', Auth.authorize, controller.groupRoom.post);

router.get('/contacts', Auth.authorize,controller.contacts.get);

router.post('/contacts', Auth.authorize,controller.contacts.post);

module.exports = router;
