const router = require('express').Router();
const axios = require('axios')
module.exports = router;

router.get('/forecast/:location', async (req, res, next) => {
  try {
    const {data} = await axios.get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${req.params.location}?apikey=${process.env.ACCUWEATHER_API_KEY}`
    )
    console.log('awforecast: ', data.Headline.Text)
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
