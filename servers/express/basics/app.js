// An express example project to showcase few abstractions
// General layout is:
//   - source-in the modules that implement individual functions
//   - create an express server app
//   - initialize each modules and setup their routes
//   - listen for clients

// main express module
var express = require('express')

// implements response redirect
const redirect = require('./redirect.js')

// implements session feature
const session = require('./session.js')

// implements a file upload function
const upload = require('./upload.js')

// a simple time retrieve function
const time = require('./time.js')

// a simple db operation
const db = require('./db.js')

// a default page that lists valid routes
const defaults = require('./defaults.js')

// create the express app
var app = express()

var server

function start() {
  // initialize the modules
  redirect.setup(app)
  session.setup(app)
  upload.setup(app, express)
  time.setup(app)
  db.setup(app)
  defaults.setup(app)

  // listen for clients!
  server = app.listen(12000, () => {
    console.log('waiting for client connections!')
    console.log('access \'http://localhost:12000\' to get started!')
  })
}

function stop() {
  db.dbstop()
  server.close()
}

exports.stop = stop
exports.start = start
