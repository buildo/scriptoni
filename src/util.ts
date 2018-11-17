import * as debug from 'debug';
import * as minimist from 'minimist';
import { Args } from './model';
import { valueOrThrow } from './scripts/webpack/util';

debug.enable('scriptoni:*');

export const logger = {
  bin: debug('scriptoni:bin'),
  metarpheus: debug('scriptoni:metarpheus'),
  metarpheusDiff: debug('scriptoni:metarpheus-diff'),
  lint: debug('scriptoni:lint'),
  lintStyle: debug('scriptoni:lint-style'),
  webpack: debug('scriptoni:webpack'),
  prettier: debug('scriptoni:prettier')
};

const defaultArgs: Partial<Args> = {
  paths: './paths.js',
  metarpheusConfig: 'metarpheus-ts-config.js',
  c: './config'
};

export const getArgs = (): Args => {
  const args = {
    ...defaultArgs,
    ...minimist(process.argv.slice(2))
  };
  return valueOrThrow(Args, args as any);
};
