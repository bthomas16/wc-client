const bcrypt = require('bcryptjs');
const knex = require('../config/db');

const User = module.exports = function () {

    function ValidFormData(formData) {  
        if(!formData) return {isSuccess: false, message: 'Please send a valid form'};
        else if (!formData.firstName) return {isSuccess: false, message: 'Please provide a first name'};
        else if (!formData.lastName) return {isSuccess: false, message: 'Please provide a last name'};
        else if (!formData.userName) return {isSuccess: false, message: 'Please provide a user name'};
        else if (!formData.email) return {isSuccess: false, message: 'Please provide a valid email'};
        else if (!formData.password) return {isSuccess: false, message: 'Please provide a password'};
        else if (!formData.phone) return {isSuccess: false, message: 'Please provide a phone number'};
        else if (!formData.address) return {isSuccess: false, message: 'Please provide an address'};
        else return {isSuccess: true, message: 'User Successfully Created'}
    }

    function CheckDuplicatesSaveUser(newUser, res) {
        return knex('peeps')
                .select()
                .where(function() {
                    this
                    .where('userName', newUser.userName)
                    .orWhere('email', newUser.email)
                })
                .first().then((user) => {
                    console.log(user, 'user')
                    if(user) {
                        console.log('user exists', user)
                        if(user.userName == newUser.userName) res.json({isSuccess: false, message: 'Username is taken'});
                        if(user.email == newUser.email) res.json({isSuccess: false, message: 'Email is taken'})
                        res.json({isSuccess: false, message: 'GET OUTTA HERE'})
                    }
                    else {
                        console.log('no user', user, newUser)
                        HashPasswordSaveUser(newUser);
                        res.json({isSuccess: true, message: 'User Successfully Created'})
                    }
                }
            )
    }
    
      function HashPasswordSaveUser(newUser) {
          let password = newUser.password;
         return bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) return {isSuccess: false, message: err}
                password = hash;
                SaveUser(newUser, password);
            })
        })   
    }
    
    const SaveUser = async function(newUser, hashPassword) {
         return await knex.insert
            ({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                userName: newUser.userName,
                email: newUser.email,
                password: hashPassword,
                phone: newUser.phone,
                address: newUser.address 
            })
        .into('peeps');
    }

    return {
        ValidFormData,
        CheckDuplicatesSaveUser
    }
}