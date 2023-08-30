const express = require('express')
const serverless = require('serverless-http') // AWS Lambda requirement and Express
const hbs = require('hbs')
const routes = require('./routes/routes')
const path = require('path')
const app = express()
const PORT = 3000

app.set('view engine', hbs)
app.use('/', routes)
app.use(express.static(path.join(__dirname, '/public')))

// We require two executions, one for local development and another for the Lambda execution.
if (process.env.ENVIRONMENT === 'production') {
  module.exports.handler = serverless(app);
} else {
  app.listen(PORT, () => {
  console.log(`app is running on PORT ${PORT}`)
  })
  module.exports = app
}
