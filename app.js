const Hapi = require('hapi')

const routes = require('./config/routes')

const server = new Hapi.Server()

server.connection({
  port: process.env.PORT || 3000
})

server.route(routes)

server.start((err) => {
  if (err) {
    console.error(err)
    return
  }

  console.log('Server running at:', server.info.uri)
})
