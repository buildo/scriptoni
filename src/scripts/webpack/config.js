import fs from 'fs';
import path from 'path';
import t from 'tcomb';
import pickBy from 'lodash/pickBy';

export const BaseConfig = t.interface({
  port: t.Number,
  devTool: t.String,
  apiEndpoint: t.String
});


// Get path for user configuration, default to './config' from user current working directory
const getConfigRelativePath = (args) => {
  const configRelativePath = args.c || './config';
  return path.resolve(process.cwd(), configRelativePath);
};

// convert js config variable to env variable
const jsConfigVariableToEnvConfigVariable = s =>
  s.replace(/[A-Z]/g, m => `_${m[0]}`).toUpperCase();

// try to read and parse a json file
const readOptionalConfigFile = fullPath => {
  try {
    const contents = fs.readFileSync(fullPath, 'utf8');
    try {
      return JSON.parse(contents);
    } catch (e) {
      /* eslint-disable no-console */
      console.log();
      console.log('ERR: invalid JSON in ', fullPath);
      /* eslint-enable no-console */
      process.exit(1);
      return {};
    }
  } catch (e) {
    return {};
  }
};

// try to load configuration type from the user project, fallback on BaseConfig
const getConfigType = (configFolderPath) => {
  const configTypePath = path.resolve(configFolderPath, './Config');
  try {
    return require(configTypePath);
  } catch (e) {
    /* eslint-disable no-console */
    console.warn(`
      No Config type definition file found in ${configTypePath}, using the default one...
    `);
    /* eslint-enable no-console */
    return BaseConfig;
  }
};

const nodeEnv = process.env.NODE_ENV || 'development';
const envWhitelist = ['apiEndpoint', 'fetchLocalesFrom'];

export default function getConfig(args) {

  // get user configuration folder path
  const configFolderPath = getConfigRelativePath(args);

  // build configuration from env variables
  const envConfig = pickBy(envWhitelist.reduce((c, k) => ({
    ...c,
    [k]: process.env[jsConfigVariableToEnvConfigVariable(k)]
  }), {}));

  // load NODE_ENV related configuration
  const referenceConfigFilePath = path.resolve(configFolderPath, `./${nodeEnv}.json`);
  const referenceConfig = readOptionalConfigFile(referenceConfigFilePath);

  // load local configuration
  const localConfigFilePath = path.resolve(configFolderPath, './local.json');
  const localConfig = readOptionalConfigFile(localConfigFilePath);

  // get Config type
  const ConfigType = getConfigType(configFolderPath);

  return ConfigType({
    ...referenceConfig,
    ...localConfig,
    ...envConfig
  });
}
