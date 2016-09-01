const Route = require('../models/route')

const index = {
  method: 'GET',
  path: '/routes',
  handler: (request, reply) => {
    Route
      .query('orderBy', 'line')
      .fetchAll({
        columns: ['id', 'line', 'name']
      })
      .then(routes => reply(routes))
      .catch(error => reply(error))
  }
}

const show = {
  method: 'GET',
  path: '/routes/{id}',
  handler: (request, reply) => {
    Route
      .where({
        id: request.params.id
      })
      .fetch({
        required: true,
        withRelated: ['schedules']
      })
      .then(route => reply(route))
      .catch(error => reply(error))
  }
}

module.exports = [index, show]
