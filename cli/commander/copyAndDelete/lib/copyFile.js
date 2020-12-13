const path = require('path')
const fs = require('fs')
const { exist } = require('./util')

const mkdirp = (dir) => {
  const dirname = path
    .relative('.', path.normalize(dir))
    .split(path.sep)
    .filter((p) => !!p)
  dirname.forEach((d, idx) => {
    const pathBuilder = dirname.slice(0, idx + 1).join(path.sep)
    if (!exist(pathBuilder)) {
      fs.mkdirSync(pathBuilder) // make directory
    }
  })
}

const copyFile = (name, directory) => {
  if (exist(name)) {
    mkdirp(directory)
    fs.copyFileSync(name, path.join(directory, name))
    console.log(`${name} file is copied.`)
  } else {
    console.error('File does not exist.')
  }
}

module.exports = copyFile
