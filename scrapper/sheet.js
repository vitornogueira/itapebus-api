const request = require('./util/request')

const scrap = function sheetScrap(route, url) {
  return request(url)
    .then(($) => {
      const lineSlug = route.line.toLowerCase().replace(' ', '-')
      const sheetBuilder = require(`./sheets/${lineSlug}`) // eslint-disable-line global-require

      return sheetBuilder($)
    })
}

module.exports = scrap
