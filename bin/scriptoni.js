#!/usr/bin/env node

var spawn = require('cross-spawn');
var script = process.argv[2];
var args = process.argv.slice(3);

switch (script) {
  case 'hello':
  case 'metarpheus':
    var result = spawn.sync(
      'node',
      [require.resolve('../lib/scripts/' + script)].concat(args),
      {stdio: 'inherit'}
    );
    process.exit(result.status);
    break;
  default:
    console.log('Unknown script "' + script + '".');
    break;
}
