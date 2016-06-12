const winston = require('winston')
const Sheet = require('../../models/sheet')

module.exports = (schedule, sheets) => Promise
  .all(sheets
    .filter(sheet => sheet)
    .map(sheet => Sheet.where({
      schedule_id: schedule.id,
      title: sheet.title
    })
    .fetch({ required: true })
    .then(result => result.save({
      data: JSON.stringify(sheet.data)
    })
    .then(data => {
      data = data.toJSON()

      winston.info('SHEET UPDATED', data)

      return data
    }))
    .catch(() => Sheet.forge({
      schedule_id: schedule.id,
      title: sheet.title,
      data: JSON.stringify(sheet.data)
    })
    .save()
    .then(data => {
      data = data.toJSON()

      winston.info('SHEET INSERTED', data)

      return data
    }))
  )
)
