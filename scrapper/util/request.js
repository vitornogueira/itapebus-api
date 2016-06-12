const rp = require('request-promise')
const cheerio = require('cheerio')

module.exports = function request(url) {
  return rp({
    uri: url,
    encoding: 'binary'
  })
  .then(htmlString => cheerio.load(htmlString))
}
