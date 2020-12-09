const chalk = require('chalk')
const currentTime = (new Date().toLocaleTimeString([], { hour12: false })).split(':').join('-')

// Pretty print console logs with Chalk
exports.log = {
  dim: (text) => console.log(chalk.dim(text)),
  success: (text) => console.log(chalk.green(text))
}

// Generates a fileName with current time. e.g. fake-names-19:29:17.json
exports.getFileName = () => `fake-names-${currentTime}.json`
