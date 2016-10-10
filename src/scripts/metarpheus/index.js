import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { logger } from '../../util';
import metarpheusTcombConfig from './config';
import metarpheusTcomb from 'metarpheus-tcomb';

function buildCmdForLogging(cmd) {
  return [' \n '].concat(cmd).join(' \n ').concat([' \n \n ']);
}

function buildCmdForExecuting(cmd) {
  return cmd.join(' \ ');
}

const cwd = process.cwd();

// METARPHEUS
// define user scala configuration (usc) file path
const uscFilePath = path.resolve(cwd, './metarpheus-config.scala');
// set config (cfg) to usc file path if exists, otherwise fallback on default config
const defaultScalaConfig = path.resolve(__dirname, '../../../src/scripts/metarpheus/config.scala');
// TODO: fs.existsSync is deprecated
const cfg = fs.existsSync(uscFilePath) && uscFilePath || defaultScalaConfig;
logger.metarpheus(`Using scala config: ${cfg}`);
// define output (otp) file path
const otp = metarpheusTcombConfig.intermRepIn;
const { apiPath } = metarpheusTcombConfig;
// compose metarpheus command
const metarpheusJar = path.resolve(__dirname, 'metarpheus.jar');
const metarpheusCmd = [
  'java',
  `-jar ${metarpheusJar}`,
  `--config=${cfg}`,
  `--output=${otp}`,
  `${apiPath}`
]; //eslint-disable-line max-len

// exec cmd syncronously
logger.metarpheus(`Starting ${buildCmdForLogging(metarpheusCmd)}`);
execSync(buildCmdForExecuting(metarpheusCmd));
logger.metarpheus(`Finished ${buildCmdForLogging(metarpheusCmd)}`);

 // METARPHEUS-TCOMB
logger.metarpheus('Starting metarpheus-tcomb');
const { overrides, modelPrelude, apiPrelude, apiModelPrefix, renameModel } = metarpheusTcombConfig;
// use metarpheus-tcomb node api to generate model and api
const { model, api } = metarpheusTcomb({
  intermRep: require(metarpheusTcombConfig.intermRepIn),
  config: {
    overrides,
    modelPrelude,
    apiPrelude,
    apiModelPrefix,
    renameModel
  }
});
logger.metarpheus('Finished metarpheus-tcomb');

// write api in api output file
logger.metarpheus(`Writing ${metarpheusTcombConfig.apiOut}`);
fs.writeFileSync(metarpheusTcombConfig.apiOut, api);
logger.metarpheus('Finished!');

// write model in model output file
logger.metarpheus(`Writing ${metarpheusTcombConfig.modelOut}`);
fs.writeFileSync(metarpheusTcombConfig.modelOut, model);
logger.metarpheus('Finished!');
