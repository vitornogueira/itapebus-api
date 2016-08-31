const colors = require('colors')
const winston = require('winston')
const fs = require('fs')

const request = require('./util/request')
const schedule = require('./schedule')
const scrapperConfig = require('../config/scrapper')
const sheetsConfig = require('../config/sheets.js')

const scrap = function routesScrap() {
  const URL = `${scrapperConfig.PATH}/rotas.html`

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
        const url = `${scrapperConfig.PATH}/${$route.find('a').attr('href')}`
        const lineSlug = line.toLowerCase().replace(' ', '-')

        if (!sheetsConfig[lineSlug]) {
          return true
        }

        routes.push({ line, name, url })
      })

      return Promise.all(routes.map(route => schedule(route)))
    })
}

module.exports = scrap
