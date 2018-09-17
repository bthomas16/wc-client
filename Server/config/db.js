const environment = process.env.NODE_ENV || 'development';
console.log(environment);
const db = require('../knexfile')[environment];
module.exports = require('knex')(db); 