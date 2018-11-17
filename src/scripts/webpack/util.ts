import * as t from 'io-ts';
import { ThrowReporter } from 'io-ts/lib/ThrowReporter';
import { Config, Paths } from '../../model';

export function getHtmlPluginConfig(NODE_ENV: string | undefined, config: Config, paths: Paths) {
  return {
    inject: false,
    bundle: NODE_ENV === 'production',
    minify: NODE_ENV === 'production' ? {} : false,
    template: paths.TEMPLATE,
    title: config.title,
    data: config.bundle
  };
}

export const statsOutputConfiguration = {
  assets: false,
  children: false,
  chunkModules: false,
  chunkOrigins: false,
  chunks: false,
  timings: true,
  colors: true
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
