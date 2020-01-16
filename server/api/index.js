const router = require('express').Router();
const axios = require('axios')
const {Forecast} = require('../db')
module.exports = router;

router.get('/forecast/:location', async (req, res, next) => {
  try {
    // Query DB for forecast for this location.
    let forecast = await Forecast.findOne({
      where: {
        key: req.params.location,
      }
    })

    // If no forecast found in DB, get a fresh one from AccuWeather.
    if (!forecast) {
      const {data} = await axios.get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${req.params.location}?apikey=${process.env.ACCUWEATHER_API_KEY}`
      )

      forecast = await Forecast.create({
        key: req.params.location,
        JSON: data
      })
    }

    res.json(forecast.JSON)
  } catch (err) {
    next(err);
  }
});

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
