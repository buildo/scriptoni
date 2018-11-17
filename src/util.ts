import * as debug from 'debug';
import * as minimist from 'minimist';
import * as t from 'io-ts';
import { ThrowReporter } from 'io-ts/lib/ThrowReporter';
import { Args } from './model';

debug.enable('scriptoni:*');

export const logger = {
  bin: debug('scriptoni:bin'),
  metarpheus: debug('scriptoni:metarpheus'),
  metarpheusDiff: debug('scriptoni:metarpheus-diff'),
  lintStyle: debug('scriptoni:lint-style'),
  webpack: debug('scriptoni:webpack'),
  prettier: debug('scriptoni:prettier')
};

const defaultArgs: Partial<Args> = {
  paths: './paths.js',
  metarpheusConfig: 'metarpheus-ts-config.js',
  c: './config'
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

export const getArgs = (): Args => {
  const args = {
    ...defaultArgs,
    ...minimist(process.argv.slice(2))
  };
  return valueOrThrow(Args, args as any);
};
