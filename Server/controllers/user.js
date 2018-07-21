const express = require('express');
const router = express.Router();
const knex = require('../config/db');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user')();

let newUser = {};

router.get('/', (req, res) => {
    knex('peeps')
    .select()
    .then(users => {
        res.json({ users: users })
    });
});

router.post('/',
     function(req, res) {
        let resJ = didthisMuthaFuckaFillOutTheFormProperly(req.body);
        newUser =  
        { firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email, 
            password: req.body.password,
            phone: req.body.phone,
            address: req.body.address 
        };
        if(resJ.isSuccess) hashPasswordSaveUser(newUser.password);
     res.json({isSuccess: resJ.isSuccess, message: resJ.message})
    }
);

 function hashPasswordSaveUser(password) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if(err) res.json({isSuccess: false, message: 'User unable to be registered at this time'})
            password = hash;
            User.SaveUser(newUser, password);
        })
    })   
}

 function didthisMuthaFuckaFillOutTheFormProperly(formData) {
    if(!formData) res.json({isSuccess: false, message: 'Please send a valid form'});
        else if (!formData.firstName) return {isSuccess: false, message: 'Please provide a first name'};
        else if (!formData.lastName) return {isSuccess: false, message: 'Please provide a last name'};
        else if (!formData.userName) return {isSuccess: false, message: 'Please provide a user name'};
        else if (!formData.email) return {isSuccess: false, message: 'Please provide a valid email'};
        else if (!formData.password) return {isSuccess: false, message: 'Please provide a password'};
        else if (!formData.phone) return {isSuccess: false, message: 'Please provide a phone number'};
        else if (!formData.address) return {isSuccess: false, message: 'Please provide an address'};
        // else if (!checkDupicateUsernames(formData.userName)) return {isSuccess: false, message: 'Get OUTTA HERE!'};
        else return {isSuccess: true, message: 'User Successfully Created'}
}

//  function checkDupicateUsernames(userName) {
//  knex('peeps')
//     .select('userName')
//     .where('userName', userName)
//     .then(duplicates => {
//         console.log(duplicates)
//         if(duplicates[0] == null || '') return true;
//         return false;
//     })
// }

module.exports = router;