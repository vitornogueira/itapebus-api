function buildLines($, $element, data, count) {
  const $nextRow = $element.next('tr')

  data = data || []
  count = count >= 0 ? ++count : 0

  if (
      $nextRow.find('td.xl149').text().length ||
      $nextRow.find('td.xl159').text().length ||
      count > 100
    ) {
    return data
  }

  $nextRow.find('td.xl150, td.xl151').each((index, cel) => {
    const text = $(cel).text().trim()
    if (text) {
      data.push(text)
    }
  })

  return buildLines($, $nextRow, data, count)
}

module.exports = function build($) {
  const schedule = { sheets: [] }
  const $description = $('td.xl143')
  const $subtitles = $('td.xl149')

  schedule.description = $description.text().replace(/\n| +(?= )/g, '')

  if (!schedule.description) {
    return null
  }

  $subtitles.each((index, subtitle) => {
    const $subtitle = $(subtitle)

    schedule.sheets.push({
      title: $subtitle.text().replace(/\n| +(?= )/g, ''),
      data: buildLines($, $subtitle.parents('tr'))
    })
  })

  return schedule
}
