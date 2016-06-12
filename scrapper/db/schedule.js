const winston = require('winston')
const Schedule = require('../../models/schedule')

const insertSheet = require('./sheet')

module.exports = (schedules, routeId) => Promise
  .all(schedules
    .filter(schedule => schedule)
    .map(schedule => Schedule.where({
      route_id: routeId,
      title: schedule.title
    })
    .fetch({ required: true })
    .then(result => result.save({
      description: schedule.description,
      type: schedule.type,
      url: schedule.url
    })
    .then(data => {
      data = data.toJSON()

      winston.info('SCHEDULE UPDATED', data)

      return insertSheet(data, schedule.sheets)
        .then(sheets => {
          data.sheets = sheets

          return data
        })
    }))
    .catch(() => Schedule.forge({
      route_id: routeId,
      title: schedule.title,
      description: schedule.description,
      type: schedule.type,
      url: schedule.url
    })
    .save()
    .then(data => {
      data = data.toJSON()

      winston.info('SCHEDULE INSERTED', data)

      return insertSheet(data, schedule.sheets)
        .then(sheets => {
          data.sheets = sheets

          return data
        })
    }))
  )
)
