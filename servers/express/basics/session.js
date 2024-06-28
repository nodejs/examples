// An example that demonstrates
// express session functionality
// A session is created with expiry of 10 seconds
// and attached with the express app

var session = require('express-session')

exports.setup = function(app) {
  app.use(session({ secret: 'random secret', cookie: { maxAge: 10000}}))

  app.get('/session', (req, res) => {
    if (!req.session.views) {
      req.session.views = 1
    } else {
      req.session.views++
    }
    if (req.session.views === 1)
      res.end(`thanks for visiting ${req.session.views}st time! (session expires in 10 seconds)`)
    else
      res.end(`thanks for visiting ${req.session.views}th time! (session expires in 10 seconds)`)
  })
}
