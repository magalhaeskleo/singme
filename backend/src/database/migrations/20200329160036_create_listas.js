exports.up = function (knex) {
  return knex.schema.createTable('listas', function (table) {
    table.increments(), table.string('name').notNullable();
    table.string('whatsapp').notNullable();
    table.string('identification').notNullable();

    table.string('evento_id').notNullable();
    table.foreign('evento_id').references('id').inTable('eventos');

    table.string('grupo_id').notNullable();
    table.foreign('grupo_id').references('grupo_id').inTable('eventos');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('listas');
};
