const winston = require('winston')

const routesScrapper = require('./scrapper/routes')
const routeUpdate = require('./scrapper/db/route')

routesScrapper()
  .then(routes => {
    Promise
      .all(routes.map(route => routeUpdate(route)))
      .then(() => process.exit())
      .catch(() => process.exit())
  })
  .catch(error => winston.log('error', error))
