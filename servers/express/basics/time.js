// An example that demonstrates
// a simple express route
// Return the current server time

exports.setup = function(app) {
  app.get('/time', (req, res) => {
    res.end(new Date().toString())
  })
}
