
exports.up = function(knex, Promise) {
  return knex.schema.createTable('peeps', (table) => {
      table.increments();
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.string('userName').notNullable();
      table.string('password').notNullable();
      table.string('email').notNullable();
      table.string('phone').notNullable();
      table.string('address').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('peeps')
};
