import * as fs from 'fs';
import * as path from 'path';
import * as t from 'io-ts';
import omit = require('lodash/omit');
import snakeCase = require('lodash/snakeCase');
import { Config, ScriptoniOptions } from '../../model';
import { valueOrThrow } from '../../util';

const getJSONConfiguration = (fullPath: string): { [k: string]: any } => {
  return fs.existsSync(fullPath)
    ? valueOrThrow(t.interface({}), JSON.parse(fs.readFileSync(fullPath, 'utf8')))
    : {};
};

const getConfigValidator = (configFolderPath: string): t.InterfaceType<any> => {
  const configTypePath = path.resolve(configFolderPath, './Config.js');

  if (!fs.existsSync(configTypePath)) {
    throw new Error(`No Config type definition file found in ${configTypePath}`);
  }

  return require(configTypePath);
};

// convert js config variable to env variable (ex: "port" => "CONFIG_PORT")
const jsConfigVariableToEnvConfigVariable = (s: string): string =>
  `CONFIG_${snakeCase(s)}`.toUpperCase();

const getConfigurationFromEnv = (keys: string[]) => {
  return keys.reduce(
    (acc, k) => {
      const envVar = process.env[jsConfigVariableToEnvConfigVariable(k)];
      return envVar
        ? {
            ...acc,
            [k]: envVar
          }
        : acc;
    },
    {} as { [k: string]: string }
  );
};

export default function getConfig(options: ScriptoniOptions): Config {
  const configFolderPath = path.resolve(process.cwd(), options.c);

  // get user's configuration validator
  const ConfigValidator = getConfigValidator(configFolderPath);

  // get JSON configurations
  const referenceConfigFilePath = path.resolve(configFolderPath, `./${process.env.NODE_ENV}.json`);
  const referenceConfig = getJSONConfiguration(referenceConfigFilePath);

  const localConfigFilePath = path.resolve(configFolderPath, './local.json');
  const localConfig = getJSONConfiguration(localConfigFilePath);

  // get env variables configuration
  const topLevelKeys = Object.keys(omit(ConfigValidator.props, 'bundle'));
  const bundleKeys =
    ConfigValidator.props.bundle && typeof ConfigValidator.props.bundle.props === 'object'
      ? Object.keys(ConfigValidator.props.bundle.props)
      : [];

  // merge configurations in single object (env > local > reference)
  const config = {
    ...referenceConfig,
    ...localConfig,
    ...getConfigurationFromEnv(topLevelKeys),
    bundle: {
      ...referenceConfig.bundle,
      ...localConfig.bundle,
      ...getConfigurationFromEnv(bundleKeys)
    }
  };

  // validate against user's validator
  valueOrThrow(ConfigValidator, config);

  const defaultConfig: Partial<Config> = {
    devTool: 'source-map',
    port: 3000
  };

  // validate against scriptoni's validator
  return valueOrThrow(Config, { ...defaultConfig, ...config });
}
