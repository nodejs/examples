const fs = require('fs').promises // use the promisified fs module
const path = require('path')

let files = 0 // initiate count to add to

async function countFiles (folderPath) {
  try {
    const usablePath = path.resolve(folderPath) // get the full path
    const contents = await fs.readdir(usablePath) // read the directory

    contents.forEach(() => { files = files + 1 }) // add 1 for every file in the directory

    return files
  } catch (error) { // this will most likely be triggered if `folderPath` is not a real path.
    throw new Error(`It seems there was a problem. Are you sure ${folderPath} a valid path?`)
  }
}

module.exports = countFiles
