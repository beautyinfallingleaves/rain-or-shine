import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {TextField} from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab'
import 'regenerator-runtime/runtime'

export const App = () => {
  const [AWLocation, setAWLocation] = useState(null)      // hook for location
  const [locationInput, setLocationInput] = useState('')  // hook for form input
  const [autoCompleteResult, setAutoCompleteResult] = useState([])  // hook for AW auto complete results

  // Fetch an AccuWeather location by geocoordinates & set it on state.
  const fetchAWLocationByGeoposition = async (lat, lon) => {
    try {
      const {data} = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.ACCUWEATHER_API_KEY}&q=${lat}%2C${lon}`
      )

      const {Key, LocalizedName, AdministrativeArea} = data
      const {ID, CountryID} = AdministrativeArea

      setAWLocation({
        key: Key,
        locale: LocalizedName,
        state: ID,
        country: CountryID
      })

      setLocationInput(`${LocalizedName}, ${ID} ${CountryID}`)
    } catch (err) {
      console.error(err)
    }
  }

  // On component mount, fetch user's geolocation to provide a default forecast.
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      fetchAWLocationByGeoposition(lat, lon)
    })
  }, [])

  // This is a hook for storing forecast from AccuWeather.
  const [AWForecast, setAWForecast] = useState(null)

  // Fetch a forecast from the backend for the provided location.
  const fetchForecast = async (locationKey) => {
    try {
      const {data} = await axios.get(`/api/forecast/${locationKey}`)
      setAWForecast(data)
    } catch (err) {
      console.error(err)
    }
  }

  // On update of AWLocation, fetch forecast from backend.
  useEffect(() => {
    if (AWLocation) fetchForecast(AWLocation.key)
  }, [AWLocation])

  // This is a hook for storing autocomplete locations from AccuWeather.
  const [AWLocationsList, setAWLocationsList] = useState()

  async function handleChange(event) {
    const searchString = event.target.value
    setAWLocation(null)
    setAWForecast(null)
    setLocationInput(searchString)

    // Update Locations dropdown with AW Autocomplete Results.
    if (searchString.length >= 3) {
      try {
        const {data} = await axios.get(
          `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.ACCUWEATHER_API_KEY}&q=${searchString}`
        )

        // *****
        // TODO - resolve returned list to AWLocationsList state hook
        // *****
        setAWLocationsList(data)
      } catch (err) {
        console.error(err)
      }
    }
  }

  // Fetch forecast when user submits.
  function handleSubmit(event) {
    fetchForecast(AWLocation.key)
    event.preventDefault()
  }

  return (
    <div>
      <h1>Rain or Shine 5-Day Weather Forecast</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="locationInput">
          Get Forecast For
        </label>
        <Autocomplete
          id="locationInput"
          options={AWLocationsList}
          getOptionLabel={option => `${option.LocalizedName}, ${option.AdministrativeArea.ID} ${option.Country.ID}`}
          style={{width: 300}}
          renderInput={params => (
            <TextField
              {...params}
              label="Start Typing"
              variant="outlined"
              fullWidth
              value={locationInput}
              onChange={handleChange}
            />
          )}
        />
        <button type="submit" disabled={AWLocation ? false : true}>Get Forecast</button>
      </form>
      {AWForecast &&
        <React.Fragment>
          <div>Forecast for {AWLocation.key}: {AWLocation.locale}</div>
          <div>{AWForecast.Headline.Text}</div>
        </React.Fragment>
      }
    </div>
  )
}
