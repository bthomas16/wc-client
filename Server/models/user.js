const bcrypt = require('bcryptjs');
const knex = require('../config/db');

const User = module.exports = function () {

    const SaveUser = async function(user, hashPassword) {
        console.log('hi', user)
         return await knex.insert
            ({
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                email: user.email,
                password: hashPassword,
                phone: user.phone,
                address: user.address 
            })
        .into('peeps');
    }

    return {
        SaveUser: SaveUser
    }
}