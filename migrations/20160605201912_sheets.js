exports.up = knex => knex.schema.createTable('sheets', table => {
  table.uuid('id').primary()
  table.uuid('schedule_id')
    .notNullable()
    .references('id')
    .inTable('schedules')
  table.string('title').notNullable()
  table.json('data').notNullable()
  table.index(['schedule_id', 'title'], 'schedule_sheet_title')
  table.timestamps()
})

exports.down = knex => knex.schema.dropTable('sheets')
