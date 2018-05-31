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

/*
 * clean /build folder
 */
function clean() {
  console.log('Clean /build folder')
  rimraf.sync('build');
  fs.mkdirSync('build');
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
  case 'web-dev':
    clean();
    exit(spawnScript('webpack/dev'));
    break;
  case 'web-build':
    clean();
    exit(spawnScript('webpack/build'));
    break;
  case 'web-dev-ts':
    clean();
    exit(spawnScript('webpack/dev-ts'));
    break;
  case 'web-build-ts':
    clean();
    exit(spawnScript('webpack/build-ts'));
    break;
  default:
    console.log('Unknown script "' + script + '".');
    break;
}
