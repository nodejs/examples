const request = require('request')
const server = require('../app.js')
const tap = require('tap')

// start the server
server.start()

// test the /redirect route
const url = 'http://localhost:12000/a'
request(url, (err, res, body) => {
  if(err)
    tap.fail(err)
  else
    tap.match(body, /redirect/, 'response string has keyword "redirect" in it')
  server.stop()
})


