const path = require('path')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const PORT = process.env.PORT || 8080
const app = express()
require('../secrets')
module.exports = app

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // compression middleware
  app.use(compression())

  // api routes
  app.use('/api', require('./api'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'dist')))

  // respond with 404 for any remaining requests with an extension (.js, .css, etc.)
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // send index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Forcasting the weather on port ${PORT}`)
  )
}

// const syncDb = () => db.sync()

async function bootApp() {
  // await syncDb()
  await createApp()
  await startListening()
}

bootApp()
