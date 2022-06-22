const request = require('request')
const server = require('../app.js')
const tap = require('tap')

// start the server
server.start()

// test the / route
const url = 'http://localhost:12000'
request(url, (err, res, body) => {
  if(err)
    tap.fail(err)
  else
    tap.match(body, /examples/, 'response string has keyword "examples" in it')
  server.stop()
})


