import React, {useState, useEffect} from 'react'
import axios from 'axios'
import 'regenerator-runtime/runtime'

export const App = () => {
  const [AWLocation, setAWLocation] = useState(null)      // hook for location
  const [locationInput, setLocationInput] = useState('')  // hook for form input

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

  function handleSubmit(event) {
    fetchForecast('')
    event.preventDefault()
  }

  return (
    <div>
      <h1>app</h1>
      <form onSubmit={handleSubmit}>

      </form>
      <button type="submit">Get Forecast</button>
      {AWLocation &&
        <div>{AWLocation.key}: {AWLocation.locale}</div>
      }
      {AWForecast &&
        <div>{AWForecast.Headline.Text}</div>
      }
    </div>
  )
}
