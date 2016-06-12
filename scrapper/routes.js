const colors = require('colors')
const winston = require('winston')
const fs = require('fs')

const request = require('./util/request')
const schedule = require('./schedule')
const config = require('../config/scrapper')

const scrap = function routesScrap() {
  const URL = `${config.PATH}/rotas.html`

  return request(URL)
    .then(($) => {
      const routes = []
      const $routes = $('.style15')

      winston.info(colors.magenta.bold(`Read: ${URL}`))

      $routes.each((index, route) => {
        const $route = $(route)
        const info = $route.text().split(/\n/)
        const line = info[0].trim()
        const name = info[1].trim()
        const url = `${config.PATH}/${$route.find('a').attr('href')}`

        try {
          const lineSlug = line.toLowerCase().replace(' ', '-')

          fs.statSync(`./scrapper/sheets/${lineSlug}.js`)

          routes.push({ line, name, url })
        } catch (error) {
          // line sheet not implemented
        }
      })

      return Promise.all(routes.map(route => schedule(route)))
    })
}

module.exports = scrap
