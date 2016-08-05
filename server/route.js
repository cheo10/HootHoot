var controller = require('./controllers');
var router = require('express').Router();

router.get('/signup', controller.users.get);

router.post('/signup', controller.users.post);

module.exports = router;
