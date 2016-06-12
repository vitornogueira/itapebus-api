const winston = require('winston')
const colors = require('colors')

const Route = require('../../models/route')
const insertSchedule = require('./schedule')

module.exports = route => {
  const line = `${colors.green(route.line)} ${colors.red(route.name)}`
  const url = `${colors.underline.blue(route.url)}`

  winston.info(`${line}: ${url}`)

  return Route.forge({
    line: route.line,
    name: route.name,
    url: route.url
  })
  .save()
  .then(data => {
    data = data.toJSON()

    winston.info('ROUTE INSERTED', data)

    return insertSchedule(route.schedules, data.id)
      .then(schedules => {
        data.schedules = schedules

        return data
      })
  })
  .catch(() => Route
    .forge({ line: route.line })
    .fetch({ require: true })
    .then(result => result.save({
      name: route.name,
      url: route.url
    })
    .then(data => {
      data = data.toJSON()

      winston.info('ROUTE UPDATED', data)

      return insertSchedule(route.schedules, data.id)
        .then(schedules => {
          data.schedules = schedules

          return data
        })
    })
    .catch(error => winston.error(error))
  ))
}
