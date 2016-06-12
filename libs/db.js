const knexfile = require('../knexfile')
const knex = require('knex')(knexfile[process.env.NODE_ENV || 'development'])
const bookshelf = require('bookshelf')(knex)

bookshelf.plugin(require('bookshelf-uuid'))
bookshelf.plugin('registry')

module.exports = bookshelf
