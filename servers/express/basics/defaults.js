exports.setup = function(app) {
  app.get('/', (req, res) => {
  res.write('welcome to express examples! the options are:\n\n')
  res.write('/time : yields the current server time\n')
  res.write('/session : tracks the client visit count, with an expiry\n')
  res.write('/upload : a single file upload function\n')
  res.write('/db : a simple db example, with an in-memory mongodb\n')
  res.end('/redirect : forwards to /landing, a simple demonstration of redirect function\n')
  })
}
