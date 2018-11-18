import * as fs from 'fs';
import * as t from 'io-ts';
import * as rimraf from 'rimraf';
import * as spawn from 'cross-spawn';
import { logger, valueOrThrow } from './util';
import { SpawnSyncReturns } from 'child_process';

const Script = t.union([
  t.literal('metarpheus'),
  t.literal('metarpheus-diff'),
  t.literal('lint-style'),
  t.literal('stylefmt'),
  t.literal('web-dev'),
  t.literal('web-build'),
  t.literal('prettier-check'),
  t.literal('prettier-write')
]);
type Script = t.TypeOf<typeof Script>;

const script = valueOrThrow(Script, process.argv[2]);
const args = process.argv.slice(3);

function spawnScript(filePath: string) {
  const commandArgs = [require.resolve(`./scripts/${filePath}`)].concat(args);
  return spawn.sync('node', commandArgs, { stdio: 'inherit' });
}

function exit(result: SpawnSyncReturns<Buffer>): never {
  return process.exit(result.status);
}

function cleanBuildFolder() {
  logger.bin('clean /build folder');
  rimraf.sync('build');
  fs.mkdirSync('build');
}

// default NODE_ENV for webpack scripts
if (script === 'web-build') {
  process.env.NODE_ENV = process.env.NODE_ENV || 'production';
} else if (script === 'web-dev') {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
}

function runScript(script: Script): null {
  switch (script) {
    case 'metarpheus':
      exit(spawnScript('metarpheus'));
      return null;
    case 'metarpheus-diff':
      exit(spawnScript('metarpheus-diff'));
      return null;
    case 'lint-style':
      exit(spawnScript('stylelint'));
      return null;
    case 'stylefmt':
      exit(spawnScript('stylelint/stylefmt'));
      return null;
    case 'web-dev':
      cleanBuildFolder();
      exit(spawnScript('webpack/dev'));
      return null;
    case 'web-build':
      cleanBuildFolder();
      exit(spawnScript('webpack/build'));
      return null;
    case 'prettier-write':
      exit(spawnScript('prettier/write'));
      return null;
    case 'prettier-check':
      exit(spawnScript('prettier/listDifferent'));
      return null;
  }
}

runScript(script);
