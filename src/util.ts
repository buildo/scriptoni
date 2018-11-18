import * as debug from 'debug';
import * as minimist from 'minimist';
import * as t from 'io-ts';
import { ThrowReporter } from 'io-ts/lib/ThrowReporter';
import { ScriptoniOptions } from './model';

debug.enable('scriptoni:*');

export const logger = {
  bin: debug('scriptoni:bin'),
  metarpheus: debug('scriptoni:metarpheus'),
  metarpheusDiff: debug('scriptoni:metarpheus-diff'),
  lintStyle: debug('scriptoni:lint-style'),
  webpack: debug('scriptoni:webpack'),
  prettier: debug('scriptoni:prettier')
};

export function valueOrThrow<O, I>(iotsType: t.Type<O, I>, value: I): O {
  const validatedValue = iotsType.decode(value);

  if (validatedValue.isLeft()) {
    ThrowReporter.report(validatedValue);
    return undefined as never;
  } else {
    return validatedValue.value;
  }
}

export const getParsedArgs = () => {
  return minimist(process.argv.slice(2));
};

const defaultScriptoniOptions: ScriptoniOptions = {
  paths: './paths.js',
  metarpheusConfig: 'metarpheus-ts-config.js',
  c: './config',
  webpackConfig: undefined,
  bundleAnalyzer: undefined
};

export const getScriptoniOptions = (): ScriptoniOptions => {
  const args = {
    ...defaultScriptoniOptions,
    ...getParsedArgs()
  };
  return valueOrThrow(ScriptoniOptions, args);
};
