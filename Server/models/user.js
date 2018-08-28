const bcrypt = require('bcryptjs');
const knex = require('../config/db');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const User = module.exports = function () {

    // REGISTER REGISTER REGISTER REGISTER

    function ValidRegisterFormData(formData, res) 
    {  
        if(!formData)  res.json({isSuccess: false, message: 'Please send a valid form'});
        else if (!formData.firstName)  res.json({isSuccess: false, message: 'Please provide a first name'});
        else if (!formData.lastName)  res.json({isSuccess: false, message: 'Please provide a last name'});
        else if (!formData.email)  res.json({isSuccess: false, message: 'Please provide a valid email'});
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
                    DuplicateError(duplicate, formData, res)
                }
                else 
                {
                    HashPasswordSaveUser(formData, res);
                }
        });
    };

    function DuplicateError(duplicate, formData, res) 
    {
        if(duplicate.email == formData.email)  res.json({isSuccess: false, message: 'An account with this email already exists'});
        else res.json({isSuccess: false, message: 'Something went wrong. Please try again later'});
    }

    function HashPasswordSaveUser(formData, res) 
    {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(formData.password, salt, (err, hash) => {
                if(err) res.json({isSuccess: false, message: err});
                password = hash;
                SaveUserToDB(formData, password)
                .then(() => {
                    CompareHashedAndSetJwt(formData, res);
                })
            })
        })   
    }

    function SaveUserToDB(formData, hashPassword) 
    {
        let tempEmail = formData.email.toLowerCase();
        return knex.insert
                ({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: tempEmail,
                    password: hashPassword
                })
            .into('peeps');
    }

    // LOGIN LOGIN LOGIN LOGIN

    function ValidLoginFormData(formData, res) 
    {  
        if(!formData) res.json({isSuccess: false, message: 'Please send a valid form'});
        else if (!formData.email) res.json({isSuccess: false, message: 'Please provide an email'});
        else if (!formData.password) res.json({isSuccess: false, message: 'Please provide a password'});
        else {
            console.log('formd data is valid')
            return true;
        }
    }

    const CompareHashedAndSetJwt = function(formData, res) 
    {
        let tempEmail = formData.email.toLowerCase();
        knex('peeps')
            .select()
            .where('email', tempEmail)
            .first()
            .then(async (user) => {
                if(user) 
                {  
                    bcrypt.compare(formData.password, user.password, function(err, match) {
                        if(err) {
                            res.json({isSuccess: false, message: 'Something went wrong'})
                        }
                        else if(match) {
                            LoginUser(user, res);
                        }
                        else res.json({isSuccess: false, message: 'Password is not correct'});   
                })   
                }
                else {
                    res.json({isSuccess: false, message: 'User does not exist'})
                }
        })
    }

    function LoginUser(user, res)
    {
        console.log('logging in user', 'user is:', user.id)
        let token = SetJwtToken(user);
        knex('peeps').where(
            'email', user.email
            ).first().then(function(user){
                console.log('logging in this user user by id', user.id)
            res.json({isSuccess: true, message: "Route to Profile now!", user, token})
        })
   } 

    function SetJwtToken(user) 
    {
        console.log('but first, setting jwt', 'user is:', user.id)
        if(!user) return false;
        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          })
          return token     
    }


    // END LOGIN



   function FindUser(id, res){
    knex('peeps').where(
        'id', id
        ).first().then(function(user)
        {
            let userStore = 
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
            res.json({isSuccess: true, message: 'User is valid', userStore})
        })
} 

    return {
        // REGISTER
        CheckDuplicatesHashAndSaveUser,
        ValidRegisterFormData,
        SaveUserToDB,

        // LOGIN
        ValidLoginFormData,
        CompareHashedAndSetJwt,

        FindUser
    }
}