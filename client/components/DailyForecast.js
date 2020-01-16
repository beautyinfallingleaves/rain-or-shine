import React from 'react'

export const DailyForecast = (props) => {
  const {forecast} = props

  return (
    <div>
      <div>{forecast.Date}</div>
    </div>
  )
}
