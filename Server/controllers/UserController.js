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
  let validForm = User.ValidRegisterFormData(req.body, res);
  if(validForm)
      User.CheckDuplicatesHashAndSaveUser(req.body, res)
});
    

router.post('/login', async (req, res) => 
{
  let valid = User.ValidLoginFormData(req.body, res);
  if(valid) {
    User.CompareHashedAndSetJwt(req.body, res);   
  }
});

router.get('/validate-jwt', VerifyToken, async (req, res) => {
  res.json({success: true})
})


router.get('/profile', VerifyToken, async (req, res) => 
{
  try 
  {
    console.log('trying', req.id)
    await User.FindUser(req.id, res);
  }
  catch
  {
    console.log('trying bad')
    
    res.json({isSuccess: false, message: 'User is not valid'})  
  }
});




module.exports = router;