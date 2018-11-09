#!/usr/bin/env node

var fs = require('fs');
var rimraf = require('rimraf');
var spawn = require('cross-spawn');
var _execSync = require('child_process').execSync;
var path = require('path');
var script = process.argv[2];
var args = process.argv.slice(3);
var logger = require('../lib/util').logger;

function spawnScript(script, moreArgs) {
  const cmd = [require.resolve('../lib/scripts/' + script)].concat(args).concat(moreArgs || []);
  return spawn.sync('node', cmd, { stdio: 'inherit' });
}

function exit(result) {
  process.exit(result.status);
}

function execSync(command, options) {
  logger.bin('executing: ', command);
  return _execSync(command, options);
}

function clean() {
  logger.bin('clean /build folder')
  rimraf.sync('build');
  fs.mkdirSync('build');
}

// default NODE_ENV for webpack scripts
if (script === 'web-build-ts') {
  process.env.NODE_ENV = process.env.NODE_ENV || 'production';
} else if (script === 'web-dev-ts') {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
}

switch (script) {
  case 'metarpheus':
  case 'metarpheus-diff':
    exit(spawnScript(script));
    break;
  case 'metarpheus-ts':
    exit(spawnScript('metarpheus', ['--ts']));
    break;
  case 'metarpheus-ts-diff':
    exit(spawnScript('metarpheus-diff', ['--ts']));
    break;
  case 'lint-style':
    exit(spawnScript('stylelint'));
    break;
  case 'lint':
    exit(spawnScript('eslint'));
    break;
  case 'stylefmt':
    exit(spawnScript('stylelint/stylefmt'));
    break;
  case 'web-dev-ts':
    clean();
    exit(spawnScript('webpack/dev-ts'));
    break;
  case 'web-build-ts':
    clean();
    exit(spawnScript('webpack/build-ts'));
    break;
  case 'prettier-write':
    clean();
    exit(spawnScript('prettier/write'));
    break;
  case 'prettier-check':
    clean();
    exit(spawnScript('prettier/listDifferent'));
    break;
  default:
    console.log('Unknown script "' + script + '".');
    break;
}
