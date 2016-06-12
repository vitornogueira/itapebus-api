const request = require('./util/request')

const menu = require('./menu')
const config = require('../config/scrapper')

const scrap = function scheduleScrap(route) {
  return request(route.url)
    .then(($) => {
      const $sheetsMenu = $('[name="frTabs"]')

      return menu(route, `${config.PATH}/horarios/${$sheetsMenu.attr('src')}`)
        .then((data) => {
          route.schedules = data

          return route
        })
    })
}

module.exports = scrap
