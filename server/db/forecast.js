const Sequelize = require('sequelize')
const db = require('./db')

const Forecast = db.define('forecast', {
  key: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  EffectiveDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  forecastJSON: {
    type: Sequelize.JSON,
    allowNull: false,
  }
})

module.exports = Forecast
