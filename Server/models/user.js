const bcrypt = require('bcryptjs');
const knex = require('../config/db');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const User = module.exports = function () {

    // REGISTER REGISTER REGISTER REGISTER

    function ValidRegisterFormData(formData, res) 
    {  
        if (!formData.firstName)  res.json({isSuccess: false, message: 'Please provide a first name'});
        else if (!formData.lastName)  res.json({isSuccess: false, message: 'Please provide a last name'});
        else if (!formData.email)  res.json({isSuccess: false, message: 'Please provide an email'});
        else if (!formData.password)  res.json({isSuccess: false, message: 'Please provide a password'});
        else return true
    }

    function CheckDuplicatesHashAndSaveUser(formData, res) 
    {
        let tempEmail = formData.email.toLowerCase();
        knex('peeps')
            .select()
            .where('email', tempEmail)
            .first()
            .then((duplicate) => {
                if(duplicate)
                {
                    console.log('found duplicate', duplicate.email, tempEmail)
                    res.json({isSuccess: false, message: 'An account with this email already exists'});
                }
                else 
                {
                    HashPasswordSaveUser(formData, res);
                }
        });
    };

    function HashPasswordSaveUser(formData, res) 
    {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(formData.password, salt, (err, hash) => {
                if(err) res.json({isSuccess: false, message: err});
                password = hash;
                SaveUserToDB(formData, password, res);
            })
        })   
    }

    function SaveUserToDB(formData, hashPassword, res) 
    {
       let tempEmail = formData.email.toLowerCase();
       knex.insert
        ({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: tempEmail,
            password: hashPassword
        })
        .into('peeps')
        .then(() => {
            console.log('user was saved')
            let user = {
                email: formData.email,
                password: formData.password
            }
            let token = SetJwtToken(user);
            res.json({isSuccess: true, message: 'Successfully Registered', token})
        }).catch(err => {
            console.log(err)
        })
    }




    // LOGIN LOGIN LOGIN LOGIN

    function ValidLoginFormData(formData, res) 
    {  
        if(!formData) res.json({isSuccess: false, message: 'Please send a valid form'});
        else if (!formData.email) res.json({isSuccess: false, message: 'Please provide an email'});
        else if (!formData.password) res.json({isSuccess: false, message: 'Please provide a password'});
        else {
            return true;
        }
    }

    const CompareHashedAndLogin = function(formData, res) 
    {
        let tempEmail = formData.email.toLowerCase();
        return knex('peeps')
            .select()
            .where('email', tempEmail)
            .first()
            .then((user) => {
                if(user) 
                {  
                    bcrypt.compare(formData.password, user.password, function(err, match) {
                        if(err) {
                            res.json({isSuccess: false, message: 'Something went wrong'})
                        }
                        else if(match) {
                            LoginUser(user, res);
                        }
                        else res.json({isSuccess: false, message: 'Password is incorrect'});   
                })   
                }
                else {
                    res.json({isSuccess: false, message: 'User does not exist'})
                }
        })
    }

    function LoginUser(user, res)
    {
        let token = SetJwtToken(user);
        knex('peeps').where(
            'email', user.email
            ).first().then(function(user){
            res.json({isSuccess: true, message: "Successfully logged in", user, token})
        })
   } 

    function SetJwtToken(user) 
    {
        if(!user) return false;
        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          })
          return token     
    }


    // END LOGIN

   function FindUser(id, res)
   {
       console.log('finding user by id', id)
        knex('peeps').where(
            'id', id
            )
            .first().then(function(user)
            {
                console.log('read me pls', user)
                let userStore = 
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
                console.log('found user', userStore)
                res.json({isSuccess: true, message: 'User is valid', userStore})
            }
        )
    } 

    return {
        // REGISTER
        ValidRegisterFormData,
        CheckDuplicatesHashAndSaveUser,
        SaveUserToDB,

        // LOGIN
        ValidLoginFormData,
        CompareHashedAndLogin,

        FindUser
    }
}