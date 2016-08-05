var controller = require('./controllers');
var router = require('express').Router();

router.get('/signup', controller.users.get);

router.post('/signup', controller.users.post);

router.get('/message', controller.message.get);

router.post('/message', controller.message.post);

router.get('/table', controller.table.get);

router.post('/table', controller.table.post);

router.get('/groupRoom', controller.groupRoom.get);

router.post('/groupRoom', controller.groupRoom.post);

router.get('/contacts', controller.contacts.get);

router.post('/contacts', controller.contacts.post);

module.exports = router;
