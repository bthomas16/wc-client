const express = require('express');
const router = express.Router();
const knex = require('../config/db');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user')();
const Promise = require('promise');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');


const VerifyToken = require('../middleware/VerifyToken');


router.post('/register', async (req, res) => 
{                              
  if(!req.body)  res.json({isSuccess: false, message: 'Please send a valid form'});
      let validForm = User.ValidRegisterFormData(req.body, res);
  if(validForm)
      User.CheckDuplicatesHashAndSaveUser(req.body, res)
});
    
router.post('/login', async (req, res) => 
{
  let valid = User.ValidLoginFormData(req.body, res);
  if(valid) {
    User.CompareHashedAndLogin(req.body, res);   
  }
});

router.get('/validate-jwt', (req, res) => 
{
  let token = req.query.jwt;
  console.log('verifying', req.params)
    jwt.verify(token, config.secret, function(err, decoded) {
      console.log(err, 'oh nooo')
    if (err) {
      console.log(err, decoded, 'hudfh')
      res.json({ isSuccess: false, message: 'Your session has expired - Please Logout and Login again.'});
    }
    res.status(200).json({isSuccess: true, message: 'User is authorized'})
  })
})


router.get('/profile', VerifyToken, async (req, res) => 
{
  try 
  {
      console.log(req)
    await User.FindUser(req.id, res);
  }
  catch
  { 
    res.status(404).json({isSuccess: false, message: 'User is not valid'})  
  }
});




module.exports = router;