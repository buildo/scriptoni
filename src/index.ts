import * as fs from 'fs';
import * as t from 'io-ts';
import * as rimraf from 'rimraf';
import { logger, valueOrThrow, getMetarpheusCLIOptions, getWebpackCLIOptions } from './util';
import metarpheus from './scripts/metarpheus';
import metarpheusDiff from './scripts/metarpheus-diff';
import prettierWrite from './scripts/prettier/write';
import prettierCheck from './scripts/prettier/listDifferent';
import stylelintCheck from './scripts/stylelint';
import stylelintWrite from './scripts/stylelint/stylefmt';
import webpackDev from './scripts/webpack/dev';
import webpackBuild from './scripts/webpack/build';

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

function runScript(script: Script): Promise<void> {
  switch (script) {
    case 'metarpheus':
      return metarpheus(getMetarpheusCLIOptions());
    case 'metarpheus-diff':
      return metarpheusDiff(getMetarpheusCLIOptions());
    case 'lint-style':
      return stylelintCheck();
    case 'stylefmt':
      return stylelintWrite();
    case 'web-dev':
      cleanBuildFolder();
      return webpackDev(getWebpackCLIOptions());
    case 'web-build':
      cleanBuildFolder();
      return webpackBuild(getWebpackCLIOptions());
    case 'prettier-write':
      return prettierWrite();
    case 'prettier-check':
      return prettierCheck();
  }
}

runScript(script).catch(() => {
  process.exit(1);
});
