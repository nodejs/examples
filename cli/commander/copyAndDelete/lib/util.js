const fs = require('fs')

const exist = (dir) => {
  try {
    fs.accessSync(
      dir,
      fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK
    ) // tests a user's permissions for the file or directory specified by path
    return true // if dir exists, return true.
  } catch (e) {
    return false // if dir not exists, return false.
  }
}

module.exports = {
  exist
}
