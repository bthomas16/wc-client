var jwt = require('jsonwebtoken');
var config = require('../config/config');

function verifyToken(req, res, next) 
{
  var token = req.headers['authorization'];
  console.log('verifying token', token, config.secret)
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) res.json({ success: false, message: 'Your session has expired - Please Logout and Login again.'});
    req.id = decoded.id;
    console.log('TOKEN VERIFIED', req.id)
    next();
  });
}
module.exports = verifyToken;