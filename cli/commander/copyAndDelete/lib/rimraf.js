const fs = require('fs')
const path = require('path')
const { exist } = require('./util')

const rimraf = (p) => {
  if (exist(p)) {
    try {
      const dir = fs.readdirSync(p)
      console.log(dir)
      dir.forEach((d) => {
        rimraf(path.join(p, d))
      })
      fs.rmdirSync(p)
      console.log(`Remove ${p} folder success`)
    } catch (e) {
      fs.unlinkSync(p)
      console.log(`Remove ${p} file success`)
    }
  } else {
    console.error('No such file or directory')
  }
}

module.exports = rimraf
