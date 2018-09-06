var jwt = require('jsonwebtoken');
var config = require('../config/config.js');

function verifyToken(req, res, next) 
{
  var token = req.headers['authorization'];
  console.log('verifying token', token)
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) res.json({ success: false, message: 'Your session has expired - Please Logout and Login again.'});
    req.id = decoded.id;
    console.log('TOKEN VERIFIED')
    next();
  });
}
module.exports = verifyToken;