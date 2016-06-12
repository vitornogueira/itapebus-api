const db = require('../libs/db')
require('./schedule')

module.exports = db.model('Route', {
  tableName: 'routes',
  uuid: true,
  hasTimestamps: true,
  schedules() {
    return this.hasMany('Schedule', 'route_id')
  }
})
