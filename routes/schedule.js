const Schedule = require('../models/schedule')
const Route = require('../models/route')

const show = {
  method: 'GET',
  path: '/schedules/{id}',
  handler: (request, reply) => {
    Schedule
      .where({ id: request.params.id })
      .fetch({
        required: true,
        withRelated: ['sheets'],
        columns: ['id', 'title', 'description', 'type', 'url', 'updated_at', 'route_id']
      })
      .then(schedule => {
        schedule = schedule.toJSON()

        Route
          .where({
            id: schedule.route_id
          })
          .fetch({
            required: true,
            columns: ['line', 'name', 'url']
          })
          .then(route => {
            schedule.route = route
            reply(schedule)
          })
      })
      .catch(error => reply(error))
  }
}

module.exports = [show]
