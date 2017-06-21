#!/usr/bin/env node

var spawn = require('cross-spawn');
var script = process.argv[2];
var args = process.argv.slice(3);

function spawnScript(script, moreArgs) {
  const cmd = [require.resolve('../lib/scripts/' + script)].concat(args).concat(moreArgs || []);
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
  case 'metarpheus-ts':
    exit(spawnScript('metarpheus', ['--ts']));
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
    exit(spawnScript('webpack/dev'));
    break;
  case 'web-build':
    exit(spawnScript('webpack/build'));
    break;
  case 'web-dev-ts':
    exit(spawnScript('webpack/dev-ts'));
    break;
  case 'web-build-ts':
    exit(spawnScript('webpack/build-ts'));
    break;
  default:
    console.log('Unknown script "' + script + '".');
    break;
}
