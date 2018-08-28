
exports.up = function(knex, Promise) {
  return knex.schema.createTable('peeps', (table) => {
      table.increments();
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.string('password').notNullable();
      table.string('email').notNullable();
      table.string('phone');
      table.string('address');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('peeps')
};
