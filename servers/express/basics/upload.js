var multer  = require('multer')
var util = require('util')


exports.setup = function(app, express) {

  app.use('/upload', express.static('public'))

  var diskstore = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    }
  })

  var middleware  = multer({ storage: diskstore}).single('upload')

  app.post('/upload', middleware, (req, res) => {
    res.end(`file uploaded! Details:\n${util.inspect(req.file)}`)
  })
}
