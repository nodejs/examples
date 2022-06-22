// An example that demonstrates
// response redirect functionality
// It redirects requests to /redirect, to /landing

exports.setup = function(app) {
  app.get('/redirect', (req, res) => {
    res.redirect('/landing')
  })

  app.get('/landing', (req, res) => {
    res.end('I am a redirect of /redirect')
  })
}

