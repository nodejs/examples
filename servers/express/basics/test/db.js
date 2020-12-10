const request = require('request')
const server = require('../app.js')
const tap = require('tap')

// start the server
server.start()

// test the /db route
const url = 'http://localhost:12000/db'
request(url, (err, res, body) => {
  if(err)
    tap.fail(err)
  else
    tap.match(body, /client/, 'db record has keyword "client" in it')
  server.stop()
})

