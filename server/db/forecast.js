const Sequelize = require('sequelize')
const db = require('./db')

const Forecast = db.define('forecast', {
  key: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  JSON: {
    type: Sequelize.JSON,
    allowNull: false,
  }
})

module.exports = Forecast
