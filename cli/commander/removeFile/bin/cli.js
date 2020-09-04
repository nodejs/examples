#!/usr/bin/env node
const { program } = require('commander');

const rimraf = require('../lib/rimraf');

program.version('0.0.1', '-v, --version').usage('[options]');

program
  .command('rimraf <path>')
  .usage('<path>')
  .description('Deletes the specified path and its sub-files/folders.')
  .action((path) => {
    rimraf(path);
  });

program.command('*', { noHelp: true }).action(() => {
  console.log('Command not found');
  program.help();
});

program.parse(process.argv);
