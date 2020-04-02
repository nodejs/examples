#!/usr/bin/env node
// inspired by: https://github.com/yargs/yargs/blob/master/example/line_count.js

const countEntries = require('../lib/countEntries') // requires our code that does heavy lifting
const log = require('../lib/log') // tiny tool we built to log output that's async/await

const yargs = require('yargs')
  .usage('Usage: $0 --directory=[path to a directory]') // defines what will be shown when the command errors out
  .demand('directory') // makes the `--directory` flag required
  .alias('directory', 'd') // aliases `--directory` to `-d`
  .describe('directory', 'the directory to count files within.') // describes what we're looking for from `--directory` for users when they write `--help`
  .argv

log(countEntries(yargs.directory))
