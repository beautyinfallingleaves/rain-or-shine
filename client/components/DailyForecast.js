import React from 'react'
import { Box, Typography, Paper } from '@material-ui/core'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'

// Define Material-UI styles
const useStyles = makeStyles(() => ({
  forecastCard: {
    padding: 5,
    color: 'white',
    background: '#232B38',
  },
}))

export const DailyForecast = (props) => {
  const classes = useStyles()
  const {forecast} = props
  const {Minimum, Maximum} = forecast.Temperature

  return (
    <Paper className={classes.forecastCard} elevation={3}>
      <Typography variant='body1'>{moment(forecast.Date).format('dddd, MMMM Do')}</Typography>
      <hr/>
      <Box>
        <Typography variant='caption'>High of {Maximum.Value}*</Typography>
      </Box>
      <Box>
        <Typography variant='caption'>Low of {Minimum.Value}*</Typography>
      </Box>
      <Box>
        <Typography variant='caption'>Daytime: {forecast.Day.IconPhrase}</Typography>
      </Box>
      <Box>
        <Typography variant='caption'>Nighttime: {forecast.Night.IconPhrase}</Typography>
      </Box>
    </Paper>
  )
}
