exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();

    table.string('grupo_id').notNullable();
    table.foreign('grupo_id').references('id').inTable('grupos');

    table.date('updateAt').notNullable();
    table.date('createdAt').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
