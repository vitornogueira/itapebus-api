function buildLines($, $element, lineConfig, data, count) {
  const $nextRow = $element.next('tr')

  data = data || []
  count = count >= 0 ? ++count : 0

  if (hasBreakLine($nextRow, lineConfig) || count > 100) {
    return data
  }

  $nextRow.find(getHourClasses(lineConfig)).each((index, cel) => {
    const text = $(cel).text().trim()
    if (text) {
      data.push(text)
    }
  })

  return buildLines($, $nextRow, lineConfig, data, count)
}

function hasBreakLine($nextRow, lineConfig) {
  return lineConfig.breakLineClasses
    .filter(breakLineClass => $nextRow.find(`td.${breakLineClass}`).text().length)
    .length
}

function getHourClasses(lineConfig) {
  return lineConfig.hourClasses.map(hourClass => `td.${hourClass}`)
}

module.exports = function build($, lineConfig) {
  const schedule = { sheets: [] }
  const $description = $(`td.${lineConfig.description}`)
  const $subtitles = $(`td.${lineConfig.subtitles}`)

  schedule.description = $description.text().replace(/\n| +(?= )/g, '')

  if (!schedule.description) {
    return null
  }

  $subtitles.each((index, subtitle) => {
    const $subtitle = $(subtitle)

    schedule.sheets.push({
      title: $subtitle.text().replace(/\n| +(?= )/g, ''),
      data: buildLines($, $subtitle.parents('tr'), lineConfig)
    })
  })

  return schedule
}
