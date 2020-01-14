const router = require('express').Router()
module.exports = router

router.get('/forecast/:location', async (req, res, next) => {
  try {
    // async fetch forecast from db
    const forecast = 'temp'
    res.json(forecast)
  } catch (err) {
    next(err)
  }
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
