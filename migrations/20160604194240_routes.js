exports.up = knex => knex.schema.createTable('routes', table => {
  table.uuid('id').primary()
  table.string('line').unique().notNullable()
  table.string('name').notNullable()
  table.string('url').notNullable()
  table.timestamps()
})

exports.down = knex => knex.schema.dropTable('routes')
