const request = require('request')
const server = require('../app.js')
const tap = require('tap')

// start the server
server.start()

// test the /time route
const url = 'http://localhost:12000/time'
request(url, (err, res, body) => {
  if(err)
    tap.fail(err)
  else
    tap.match(body, /GMT/, 'date string has GMT in it')
  server.stop()
})


