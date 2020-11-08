#!/usr/bin/env node
const { program } = require('commander')

const { randomGender, logNames, saveNames } = require('../lib/fake-names') // name generating lib
const { log } = require('../lib/utils') // helper utilities
const packageJSON = require('../package.json')

program
  .version(packageJSON.version)
  .description(packageJSON.description)
  .usage('<option>')
  .option('-g, --gender <option>', 'Specify gender', randomGender())
  .option('-n, --nameType <option>', 'name', 'fullName')
  .option('-t, --times <option>', 'number of times', 1)
  .option('-i --info', 'info', false)
  .option('-s --save', 'save as json', false)

// custom help must be defined before .parse()
program.on('--help', () => {
  const examples = ['-g female', '-g male', '-n firstName', '-n lastName']
  console.log('Example usages:')
  examples.forEach(example => console.log(`\t$ fake-names-generator ${example}`))
})

program.parse(process.argv)

if (program.info) {
  log.dim(`\nGenerating ${program.times} ${program.gender} names \n`)
}

// always logs the generated names
logNames(program.times, program.nameType, program.gender)

// Saves the generated names as JSON file.
if (program.save) {
  saveNames(program.times, program.nameType, program.gender)
}
