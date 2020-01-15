const router = require('express').Router();
module.exports = router;

//temp forecast
const forecast = {
  Headline: {
    EffectiveDate: '2020-01-15T10:00:00-06:00',
    EffectiveEpochDate: 1579104000,
    Severity: 3,
    Text: 'Mixed rain and snow late tomorrow morning to tomorrow afternoon',
    Category: 'snow/rain',
    EndDate: '2020-01-15T19:00:00-06:00',
    EndEpochDate: 1579136400,
    MobileLink:
      'http://m.accuweather.com/en/us/wicker-park-il/60622/extended-weather-forecast/2626592?lang=en-us',
    Link:
      'http://www.accuweather.com/en/us/wicker-park-il/60622/daily-weather-forecast/2626592?lang=en-us',
  },
  DailyForecasts: [
    {
      Date: '2020-01-14T07:00:00-06:00',
      EpochDate: 1579006800,
      Temperature: {
        Minimum: {
          Value: 29,
          Unit: 'F',
          UnitType: 18,
        },
        Maximum: {
          Value: 42,
          Unit: 'F',
          UnitType: 18,
        },
      },
      Day: {
        Icon: 6,
        IconPhrase: 'Mostly cloudy',
        HasPrecipitation: false,
      },
      Night: {
        Icon: 34,
        IconPhrase: 'Mostly clear',
        HasPrecipitation: false,
      },
      Sources: ['AccuWeather'],
      MobileLink:
        'http://m.accuweather.com/en/us/wicker-park-il/60622/daily-weather-forecast/2626592?day=1&lang=en-us',
      Link:
        'http://www.accuweather.com/en/us/wicker-park-il/60622/daily-weather-forecast/2626592?day=1&lang=en-us',
    },
    {
      Date: '2020-01-15T07:00:00-06:00',
      EpochDate: 1579093200,
      Temperature: {
        Minimum: {
          Value: 17,
          Unit: 'F',
          UnitType: 18,
        },
        Maximum: {
          Value: 40,
          Unit: 'F',
          UnitType: 18,
        },
      },
      Day: {
        Icon: 29,
        IconPhrase: 'Rain and snow',
        HasPrecipitation: true,
        PrecipitationType: 'Rain',
        PrecipitationIntensity: 'Light',
      },
      Night: {
        Icon: 36,
        IconPhrase: 'Intermittent clouds',
        HasPrecipitation: false,
      },
      Sources: ['AccuWeather'],
      MobileLink:
        'http://m.accuweather.com/en/us/wicker-park-il/60622/daily-weather-forecast/2626592?day=2&lang=en-us',
      Link:
        'http://www.accuweather.com/en/us/wicker-park-il/60622/daily-weather-forecast/2626592?day=2&lang=en-us',
    },
    {
      Date: '2020-01-16T07:00:00-06:00',
      EpochDate: 1579179600,
      Temperature: {
        Minimum: {
          Value: 18,
          Unit: 'F',
          UnitType: 18,
        },
        Maximum: {
          Value: 26,
          Unit: 'F',
          UnitType: 18,
        },
      },
      Day: {
        Icon: 3,
        IconPhrase: 'Partly sunny',
        HasPrecipitation: false,
      },
      Night: {
        Icon: 38,
        IconPhrase: 'Mostly cloudy',
        HasPrecipitation: false,
      },
      Sources: ['AccuWeather'],
      MobileLink:
        'http://m.accuweather.com/en/us/wicker-park-il/60622/daily-weather-forecast/2626592?day=3&lang=en-us',
      Link:
        'http://www.accuweather.com/en/us/wicker-park-il/60622/daily-weather-forecast/2626592?day=3&lang=en-us',
    },
    {
      Date: '2020-01-17T07:00:00-06:00',
      EpochDate: 1579266000,
      Temperature: {
        Minimum: {
          Value: 30,
          Unit: 'F',
          UnitType: 18,
        },
        Maximum: {
          Value: 32,
          Unit: 'F',
          UnitType: 18,
        },
      },
      Day: {
        Icon: 19,
        IconPhrase: 'Flurries',
        HasPrecipitation: true,
        PrecipitationType: 'Snow',
        PrecipitationIntensity: 'Light',
      },
      Night: {
        Icon: 26,
        IconPhrase: 'Freezing rain',
        HasPrecipitation: true,
        PrecipitationType: 'Mixed',
        PrecipitationIntensity: 'Moderate',
      },
      Sources: ['AccuWeather'],
      MobileLink:
        'http://m.accuweather.com/en/us/wicker-park-il/60622/daily-weather-forecast/2626592?day=4&lang=en-us',
      Link:
        'http://www.accuweather.com/en/us/wicker-park-il/60622/daily-weather-forecast/2626592?day=4&lang=en-us',
    },
    {
      Date: '2020-01-18T07:00:00-06:00',
      EpochDate: 1579352400,
      Temperature: {
        Minimum: {
          Value: 6,
          Unit: 'F',
          UnitType: 18,
        },
        Maximum: {
          Value: 37,
          Unit: 'F',
          UnitType: 18,
        },
      },
      Day: {
        Icon: 26,
        IconPhrase: 'Freezing rain',
        HasPrecipitation: true,
        PrecipitationType: 'Mixed',
        PrecipitationIntensity: 'Light',
      },
      Night: {
        Icon: 31,
        IconPhrase: 'Cold',
        HasPrecipitation: false,
      },
      Sources: ['AccuWeather'],
      MobileLink:
        'http://m.accuweather.com/en/us/wicker-park-il/60622/daily-weather-forecast/2626592?day=5&lang=en-us',
      Link:
        'http://www.accuweather.com/en/us/wicker-park-il/60622/daily-weather-forecast/2626592?day=5&lang=en-us',
    },
  ],
};

router.get('/forecast/:location', async (req, res, next) => {
  try {
    res.json(forecast);
  } catch (err) {
    next(err);
  }
});

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
