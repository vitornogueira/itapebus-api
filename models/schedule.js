const db = require('../libs/db')
require('./sheet')

module.exports = db.model('Schedule', {
  tableName: 'schedules',
  uuid: true,
  hasTimestamps: true,
  sheets() {
    return this.hasMany('Sheet', 'schedule_id')
  }
})
