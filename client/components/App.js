import React, {useState, useEffect} from 'react'
import axios from 'axios'
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

  // This state hook will manage forecasts returned from AccuWeather.
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

  function handleChange(event) {
    setAWLocation(null)
    setLocationInput(event.target.value)
    // lookup locations
  }

  // Fetch forecast when user submits.
  function handleSubmit(event) {
    fetchForecast(AWLocation.key)
    event.preventDefault()
  }

  return (
    <div>
      <h1>app</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="locationInput">
          Get Forecast For
        </label>
        <input
          id="locationInput"
          type="text"
          value={locationInput}
          onChange={handleChange}
          placeholder="Start typing a location."
        />
        <button type="submit" disabled={AWLocation ? false : true}>Get Forecast</button>
      </form>
      {AWLocation &&
        <div>{AWLocation.key}: {AWLocation.locale}</div>
      }
      {AWForecast &&
        <div>{AWForecast.Headline.Text}</div>
      }
    </div>
  )
}
