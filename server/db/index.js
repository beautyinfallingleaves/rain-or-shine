const db = require('./db')
const Forecast = require('./forecast')
const {Op} = require('sequelize')
const moment = require('moment')

// Every 15 minutes, purge forecasts older than 1 hour.
const purgeStaleForecasts = setInterval(() => {
  Forecast.destroy({
    where: {
      createdAt: {
        [Op.lte]: moment().subtract(1, 'hours').toDate()
      }
    }
  })
}, 900000)

module.exports = {db, Forecast}
