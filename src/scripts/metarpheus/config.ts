import * as fs from 'fs';
import * as path from 'path';
import { undefinedType } from 'io-ts-codegen';
import { Args, MetarpheusConfig, PartialMetarpheusConfig } from '../../model';
import { valueOrThrow } from '../webpack/util';

const defaultConfig: MetarpheusConfig = {
  isReadonly: false,
  runtime: true,
  newtypes: [],
  optionalType: undefinedType,
  wiro: false,
  modelsForciblyInUse: [],
  modelPrelude: '',
  apiPrelude: '',
  apiPaths: [path.resolve(process.cwd(), '../api/src/main/scala')],
  modelOut: path.resolve(process.cwd(), 'src/metarpheus/model.ts'),
  apiOut: path.resolve(process.cwd(), 'src/metarpheus/api.ts'),
  authRouteTermNames: ['withRole']
};

export default function(args: Args): MetarpheusConfig {
  const userMetarpheusConfigPath = path.resolve(
    process.cwd(),
    args.metarpheusConfig || 'metarpheus-ts-config.js'
  );

  if (fs.existsSync(userMetarpheusConfigPath)) {
    const userMetarpheusConfig = valueOrThrow(
      PartialMetarpheusConfig,
      require(userMetarpheusConfigPath)
    );

    return {
      ...defaultConfig,
      ...userMetarpheusConfig
    };
  }

  return defaultConfig;
}
