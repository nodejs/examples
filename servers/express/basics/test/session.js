const request = require('request')
const server = require('../app.js')
const tap = require('tap')

// start the server
server.start()

// test the /session route
const url = 'http://localhost:12000/session'
request(url, (err, res, body) => {
  if(err)
    tap.fail(err)
  else
    tap.match(body, /visit/, 'response string has keyword "visit" in it')
  server.stop()
})


