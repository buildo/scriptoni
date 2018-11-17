import * as fs from 'fs';
import * as path from 'path';
import * as t from 'io-ts';
import omit = require('lodash/omit');
import { Args, Config } from '../../model';

const defaultConfigType = t.interface(
  {
    bundle: t.interface({})
  },
  'Config'
);

// convert js config variable to env variable and prefix it with 'CONFIG_'
const jsConfigVariableToEnvConfigVariable = (s: string): string =>
  `CONFIG_${s.replace(/[A-Z]/g, m => `_${m[0]}`).toUpperCase()}`;

// try to read and parse a json file
const readOptionalConfigFile = (fullPath: string) => {
  try {
    const contents = fs.readFileSync(fullPath, 'utf8');
    try {
      return JSON.parse(contents);
    } catch (e) {
      console.log();
      console.log('ERR: invalid JSON in ', fullPath);
      process.exit(1);
    }
  } catch (e) {
    return {};
  }
};

// try to load configuration type from the user project, fallback on BaseConfig
const getConfigType = (configFolderPath: string) => {
  const configTypePath = path.resolve(configFolderPath, './Config.js');
  if (!fs.existsSync(configTypePath)) {
    console.warn(`
        No Config type definition file found in ${configTypePath}, using the default one...
      `);
    return defaultConfigType;
  }
  return require(configTypePath);
};

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

export default function getConfig(args: Args): Config {
  // get user configuration folder path
  const configFolderPath = path.resolve(process.cwd(), args.c);

  // load NODE_ENV related configuration
  const referenceConfigFilePath = path.resolve(configFolderPath, `./${process.env.NODE_ENV}.json`);
  const referenceConfig = readOptionalConfigFile(referenceConfigFilePath);

  console.log('\nciao\n', referenceConfigFilePath, referenceConfig);

  // load local configuration
  const localConfigFilePath = path.resolve(configFolderPath, './local.json');
  const localConfig = readOptionalConfigFile(localConfigFilePath);

  const fileConfig = {
    ...referenceConfig,
    ...localConfig,
    bundle: {
      ...referenceConfig.bundle,
      ...localConfig.bundle
    }
  };

  // get Config type
  const ConfigType = getConfigType(configFolderPath);

  // merge environment config values into fileConfig
  const topLevelKeys = Object.keys(omit(ConfigType.meta.props, 'bundle'));
  const bundleKeys = Object.keys(ConfigType.meta.props.bundle.meta.props);
  const config = {
    ...fileConfig,
    ...getConfigurationFromEnv(topLevelKeys),
    bundle: {
      ...fileConfig.bundle,
      ...getConfigurationFromEnv(bundleKeys)
    }
  };

  if (!ConfigType.is(config)) {
    throw new Error(`Configuration is invalid! ${JSON.stringify(config, null, 4)}`);
  }
  return ConfigType(config);
}
