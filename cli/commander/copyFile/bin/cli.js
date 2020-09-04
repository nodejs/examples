#!/usr/bin/env node
const { program } = require('commander');

const copyFile = require('../lib/copyFile');

program.version('0.0.1', '-v, --version').usage('[options]');

program
  .command('copy <name> <directory>')
  .usage('<name> <directory>')
  .description('Copy file.')
  .action((name, direcotry) => {
    copyFile(name, direcotry);
  });

program.command('*', { noHelp: true }).action(() => {
  console.log('Command not found');
  program.help();
});

program.parse(process.argv);
