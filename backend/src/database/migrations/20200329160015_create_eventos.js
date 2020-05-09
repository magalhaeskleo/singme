exports.up = function (knex) {
  return knex.schema.createTable('eventos', function (table) {
    table.increments(), table.string('name').notNullable();
    table.date('date').notNullable();
    table.string('location').notNullable();
    table.string('soundcheck').notNullable();
    table.string('showstart').notNullable();
    table.string('showtime').notNullable();
    table.string('comments');

    table.string('grupo_id').notNullable();
    table.foreign('grupo_id').references('id').inTable('grupos');
    table.date('createdAt').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('eventos');
};
