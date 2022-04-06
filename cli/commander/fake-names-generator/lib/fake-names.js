const Chance = require('chance') // Load Chance
const chance = new Chance() // Instantiate Chance so it can be used
const fs = require('fs')
const { log, getFileName } = require('../lib/utils')

// Get First name
exports.firstName = () => chance.first()

// Get Last name
exports.lastName = () => chance.last()

// Get Full name
exports.fullName = () => chance.name()

// Generates names based on cli inputs
exports.generateNames = (times = 1, nameType = 'fullName') => {
  const names = []
  for (let i = 1; i <= times; i++) {
    names.push(this[nameType]())
  }
  return names
}

// Logs the generated names
exports.logNames = (times, nameType) => {
  this.generateNames(times, nameType).forEach(name => console.log(name))
}

// Saves the generated names in a JSON File
exports.saveNames = (times, nameType) => {
  const names = this.generateNames(times, nameType)
  names.forEach(name => console.log(name))
  const data = JSON.stringify({ names })
  fs.writeFileSync(getFileName(), data)
  log.success(`\n✅ Saved ${times} names to ${getFileName()}\n`)
}
