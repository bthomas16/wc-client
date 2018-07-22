const express = require('express');
const router = express.Router();
const knex = require('../config/db');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user')();

router.get('/', (req, res) => {
    knex('peeps')
    .select()
    .then(users => {
        res.json({ users: users })
    });
});

router.post('/',
    function(req, res) {
        let resJ =  User.ValidFormData(req.body),
            newUser =  
            { firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                email: req.body.email, 
                password: req.body.password,
                phone: req.body.phone,
                address: req.body.address 
            };
            User.CheckDuplicatesSaveUser(newUser, res);
    }
);



// async function checkDuplicates(userName, email, duplicates) {
//     duplicates = await kcount with us
//              else {
//                 console.log('oudl be new user');
//                 return false;

//              }
            
//         })
//         return duplicates;
        
// }

module.exports = router;