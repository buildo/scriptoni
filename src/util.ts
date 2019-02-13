import * as debug from 'debug';
import * as minimist from 'minimist';
import * as t from 'io-ts';
import { ThrowReporter } from 'io-ts/lib/ThrowReporter';
import { WebpackCLIOptions, MetarpheusCLIOptions } from './model';

debug.enable('scriptoni:*');

export const logger = {
  bin: debug('scriptoni:bin'),
  error: debug('scriptoni:error'),
  metarpheus: debug('scriptoni:metarpheus'),
  metarpheusDiff: debug('scriptoni:metarpheus-diff'),
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
  return minimist(process.argv.slice(3)); // first arg is scriptoni's script (ex: web-build, metarpheus...)
};

export const getMetarpheusCLIOptions = (): MetarpheusCLIOptions => {
  const args: unknown = {
    ...getParsedArgs()
  };
  return valueOrThrow(MetarpheusCLIOptions, args);
};

export const getWebpackCLIOptions = (): WebpackCLIOptions => {
  const defaultWebpackCLIOptions: WebpackCLIOptions = {
    paths: './paths.js',
    c: './config',
    webpackConfig: undefined,
    bundleAnalyzer: undefined
  };

  const args = {
    ...defaultWebpackCLIOptions,
    ...getParsedArgs()
  };
  return valueOrThrow(WebpackCLIOptions, args);
};
