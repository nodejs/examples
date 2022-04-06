#!/usr/bin/env node
const { program } = require('commander')

const { logNames, saveNames } = require('../lib/fake-names') // name generating lib
const { log } = require('../lib/utils') // helper utilities
const packageJSON = require('../package.json')

program
  .version(packageJSON.version)
  .description(packageJSON.description)
  .usage('<option>')
  .option('-n, --nameType <option>', 'name', 'fullName')
  .option('-t, --times <option>', 'number of times', 1)
  .option('-i --info', 'info', false)
  .option('-s --save', 'save as json', false)

// custom help must be defined before .parse()
program.on('--help', () => {
  const examples = [
    '-n firstName \t# generates a first name',
    '-n lastName \t# generates a last name',
    '-t 5 \t\t# generates 5 full names',
    '-s \t\t# generates a full name also saves the result as json file',
    '-i \t\t# gives extra log info during name generation']
  console.log('\nExample usages:\n')
  examples.forEach(example => console.log(`\t$ fake-names-generator ${example}`))
})

program.parse(process.argv)

if (program.info) {
  log.dim(`\nGenerating ${program.times} names \n`)
}

// Saves the generated names as JSON file.
if (program.save) {
  saveNames(program.times, program.nameType)
} else {
  // always logs the generated names
  logNames(program.times, program.nameType)
}
