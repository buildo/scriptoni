#!/usr/bin/env node

var spawn = require('cross-spawn');
var script = process.argv[2];
var args = process.argv.slice(3);

function spawnScript(script) {
  const cmd = [require.resolve('../lib/scripts/' + script)].concat(args);
  return spawn.sync('node', cmd, { stdio: 'inherit' });
}

function exit(result) {
  process.exit(result.status);
}

switch (script) {
  case 'metarpheus':
  case 'metarpheus-diff':
    exit(spawnScript(script));
    break;
  case 'lint-style':
    exit(spawnScript('stylelint'));
    break;
  default:
    console.log('Unknown script "' + script + '".');
    break;
}
