const Chance = require('chance') // Load Chance
const chance = new Chance() // Instantiate Chance so it can be used
const fs = require('fs')
const { log, getFileName } = require('../lib/utils')

const genders = ['female', 'male']

// Pick random gender
exports.randomGender = () => genders[Math.floor(Math.random() * genders.length)]

// Get First name of a given gender. If gender is not given, random gender is picked
exports.firstName = (gender = this.randomGender()) => chance.first({ gender })

// Get Last name of a given gender. If gender is not given, random gender is picked
exports.lastName = (gender = this.randomGender()) => chance.last({ gender })

// Get Full name of a given gender. If gender is not given, random gender is picked
exports.fullName = (gender = this.randomGender()) => chance.name({ gender })

// Generates names based on cli inputs
exports.generateNames = (times = 1, nameType = 'fullName', gender = this.randomGender()) => {
  const names = []
  for (let i = 1; i <= times; i++) {
    names.push(this[nameType](gender))
  }
  return names
}

// Logs the generated names
exports.logNames = (times, nameType, gender) => {
  this.generateNames(times, nameType, gender).forEach(name => console.log(name))
}

// Saves the generated names in a JSON File
exports.saveNames = (times, nameType, gender) => {
  const names = this.generateNames(times, nameType, gender)
  const data = JSON.stringify({ names })
  fs.writeFileSync(getFileName(), data)
  log.success(`\n✅ Saved ${times} ${gender} names to ${getFileName()}\n`)
}
