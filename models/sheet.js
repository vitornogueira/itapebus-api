const db = require('../libs/db')

module.exports = db.model('Sheet', {
  tableName: 'sheets',
  uuid: true,
  hasTimestamps: true
})
