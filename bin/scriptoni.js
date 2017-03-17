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
  case 'lint-style-fix':
    exit(spawnScript('stylelint/fix'));
    break;
  case 'lint':
    exit(spawnScript('eslint'));
    break;
  case 'lint-fix':
    exit(spawnScript('eslint/fix'));
    break;
  case 'web-dev':
    exit(spawnScript('webpack/dev'));
    break;
  case 'web-build':
    exit(spawnScript('webpack/build'));
    break;
  default:
    console.log('Unknown script "' + script + '".');
    break;
}
