// An example that shows a database operation.
// I used an in-memory mongodb server for this
// extract the client address, compute the current
// time and store these in the db. Respond back
// with the history of all client accesses.

// server

// source-in an in-memory server module
const { MongoMemoryServer } = require('mongodb-memory-server')

// server host
const HOST = 'localhost'

// server port
const PORT = 13000

// db instance name
const DBNAME = 'mydb'

// server instance, created through dbstart
let mongod = null

// start a server instance
async function dbstart() {
  mongod = new MongoMemoryServer({instance: {port: PORT, dbName: DBNAME}})
  await mongod.getDbName()
}

// stop the server instance
exports.dbstop = async function() {
  if(mongod)
    await mongod.stop()
}

// client

async function exec(req, res) {
  // source-in the db client
  const MongoClient = require('mongodb').MongoClient

  // start the db server
  await dbstart()
  const url = `mongodb://${HOST}:${PORT}`

  // connect to the db server
  MongoClient.connect(url, (err, client) => {
    const db = client.db(DBNAME)
    const collection = db.collection('documents')

    // create a new record
    var record = {}
    record.time= new Date().toString()
    record.client = req.connection.remoteAddress

    // insert the record into the db
    collection.insertMany([record], function(err, result) {

      // retrieve all the records back
      collection.find({}).toArray(function(err, docs) {

        // send it as the response.
        res.end(JSON.stringify(docs))
        client.close()
      })
    })
  })
}

exports.setup = function(app) {
  app.get('/db', (req, res) => {
    exec(req, res)
  })
}

