import React, {useState, useEffect} from 'react'
import axios from 'axios'
import 'regenerator-runtime/runtime'

export const App = () => {
  // This state hook will manage locations returned by AccuWeather.
  const [AWLocation, setAWLocation] = useState(null)

  // Fetch an AccuWeather location by geocoordinates & set it on state.
  const fetchAWLocationByGeoposition = async (lat, lon) => {
    try {
      const {data} = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.ACCUWEATHER_API_KEY}&q=${lat}%2C${lon}`
      )

      setAWLocation({
        key: data.Key,
        locale: data.LocalizedName,
        state: data.AdministrativeArea.ID,
        country: data.AdministrativeArea.CountryID
      })
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

  return (
    <div>
      <h1>app</h1>
      {AWLocation &&
        <div>{AWLocation.key}: {AWLocation.locale}</div>
      }
      {AWForecast &&
        <div>{AWForecast.Headline.Text}</div>
      }
    </div>
  )
}
