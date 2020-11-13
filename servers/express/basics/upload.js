var multer  = require('multer')
var util = require('util')
var fs = require('fs')


exports.setup = function(app, express) {

  app.use('/upload', express.static('public'))

  // create an upload folder, if one does not exist
  if(!fs.existsSync('./uploads'))
    fs.mkdirSync('./uploads')

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
