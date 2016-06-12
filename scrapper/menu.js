const request = require('./util/request')

const sheet = require('./sheet')
const config = require('../config/scrapper')

const scrap = function menuScrap(route, url) {
  let sheetBaseUrl = `${config.PATH}/horarios/`

  sheetBaseUrl += `${url.split('/').reverse()[1]}/`

  return request(url)
    .then(($) => {
      const menus = []
      const $menus = $('[target="frSheet"]')

      $menus.each((index, sheetHtml) => {
        const $sheet = $(sheetHtml)

        menus.push({
          title: $sheet.text(),
          type: 'schedule', // schedule or routes
          url: sheetBaseUrl + $sheet.attr('href')
        })
      })

      return Promise.all(
        menus.map(menu => sheet(route, menu.url).then(data => {
          if (!data) {
            return null
          }

          data.title = menu.title
          data.type = menu.type
          data.url = menu.url

          return data
        }))
      )
    })
}

module.exports = scrap
