const environment = process.env.NODE_ENV || 'development';
const db = require('./knexfile')[environment];
module.exports = require('knex')(db); 