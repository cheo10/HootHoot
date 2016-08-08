var jwt = require('jsonwebtoken');

var secret = 'secret';

module.exports = {

  authorize: function(req, res, next) {
    console.log(req.headers['x-access-token'], '#############');
    var token = req.body.token || req.headers['x-access-token'];
    if(token) {
      console.log('token');
      jwt.verify(token, secret, function(err, decoded) {
        if(err) {
          console.log('JWT could not verify', err);
          return res.status(403).send(err);
        } else {
          req.decoded = decoded;
          return next();
        }
      })
    }
    else {
      res.status(403).send('No token provided');
    }
  }
}