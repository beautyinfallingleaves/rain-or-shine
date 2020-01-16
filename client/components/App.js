import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { DailyForecast } from './';
import ReactLoading from 'react-loading';
import 'regenerator-runtime/runtime';

// Define Material-UI styles
const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    background: 'linear-gradient(45deg, #1A5589 30%, #D3E3F2 90%)',
    padding: '1rem',
  },
  mainContainer: {
    minHeight: '50vh',
    padding: 10,
    background: '#D9DEE7',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    minHeight: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  forecast: {
    minHeight: 250,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
}));

export const App = () => {
  const classes = useStyles();
  const [AWLocation, setAWLocation] = useState(null); // hook for location
  const [locationInput, setLocationInput] = useState(''); // hook for form input

  // Fetch an AccuWeather location by geocoordinates & set it on state.
  const fetchAWLocationByGeoposition = async (lat, lon) => {
    try {
      const { data } = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.ACCUWEATHER_API_KEY}&q=${lat}%2C${lon}`
      );

      const { Key, LocalizedName, AdministrativeArea } = data;
      const { ID, CountryID } = AdministrativeArea;

      setAWLocation({
        key: Key,
        locale: LocalizedName,
        state: ID,
        country: CountryID,
      });

      setLocationInput(`${LocalizedName}, ${ID} ${CountryID}`);
    } catch (err) {
      console.error(err);
    }
  };

  // On component mount, fetch user's geolocation to provide a default forecast.
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchAWLocationByGeoposition(lat, lon);
    });
  }, []);

  // This is a hook for storing forecast from AccuWeather.
  const [AWForecast, setAWForecast] = useState(null);

  // Fetch a forecast from the backend for the provided location.
  const fetchForecast = async locationKey => {
    try {
      const { data } = await axios.get(`/api/forecast/${locationKey}`);
      setAWForecast(data);
    } catch (err) {
      console.error(err);
    }
  };

  // On update of AWLocation, fetch forecast from backend.
  useEffect(() => {
    if (AWLocation) fetchForecast(AWLocation.key);
  }, [AWLocation]);

  // This is a hook for storing autocomplete locations from AccuWeather.
  const [AWLocationOptions, setAWLocationOptions] = useState();

  async function handleChange(event) {
    const searchString = event.target.value;
    setAWLocation(null);
    setAWForecast(null);
    setLocationInput(searchString);

    // Update Locations dropdown with AW Autocomplete Results.
    if (searchString.length >= 3) {
      try {
        const { data } = await axios.get(
          `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.ACCUWEATHER_API_KEY}&q=${searchString}`
        );

        setAWLocationOptions(data);
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <Box className={classes.root}>
      <Paper className={classes.mainContainer} elevation={5}>
        <Box className={classes.header}>
          <Typography variant="h4">
            Rain or Shine 5-Day Weather Forecast
          </Typography>
          <Autocomplete
            id="locationInput"
            options={AWLocationOptions}
            getOptionLabel={option =>
              `${option.LocalizedName}, ${option.AdministrativeArea.ID} ${option.Country.ID}`
            }
            onInputChange={handleChange}
            onChange={(event, value) =>
              setAWLocation({
                key: value.Key,
                locale: value.LocalizedName,
                state: value.AdministrativeArea.ID,
                country: value.CountryID,
              })
            }
            style={{ width: 300 }}
            renderInput={params => (
              <TextField
                {...params}
                label="Start Typing a Location"
                variant="outlined"
                fullWidth
                value={locationInput}
              />
            )}
          />
        </Box>
        {AWForecast ? (
          <Box className={classes.forecast}>
            <Typography variant="h5">
              Forecast for {AWLocation.locale}, {AWLocation.state}
            </Typography>
            <Typography variant="body1">{AWForecast.Headline.Text}</Typography>
            <Grid container spacing={2} justify="center">
              {AWForecast.DailyForecasts.map(dailyForecast => (
                <Grid item key={dailyForecast.Date}>
                  <DailyForecast forecast={dailyForecast} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <ReactLoading type="spinningBubbles" color="#FFF" className={classes.forecast} />
        )}
      </Paper>
    </Box>
  );
};
