
// exports.up = function(knex, Promise) {
//     return knex.schema.createTable('collection', (table) => {
//         table.increments('id').primary();
//         table.integer('user_id').references('id').inTable('peeps');
//         table.string('name');
//     })
//   };
  
//   exports.down = function(knex, Promise) {
//     return knex.schema.dropTable('collection')
//   };