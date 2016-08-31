const request = require('./util/request')
const sheetBuilder = require('./util/sheet')
const sheetsConfig = require('../config/sheets.js')

const scrap = function sheetScrap(route, url) {
  return request(url)
    .then(($) => {
      const lineSlug = route.line.toLowerCase().replace(' ', '-')

      return sheetBuilder($, sheetsConfig[lineSlug])
    })
}

module.exports = scrap
