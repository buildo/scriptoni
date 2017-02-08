import os from 'os';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import metarpheusTcomb from 'metarpheus-tcomb';
import { logger } from '../../util';
function buildCmdForLogging(cmd) {
  return [' \n '].concat(cmd).join(' \n ').concat([' \n \n ']);
}

function buildCmdForExecuting(cmd) {
  return cmd.join(' \ ');
}

const homeDir = os.homedir();

// RUN METARPHEUS
export default function runMetarpheusTcomb(metarpheusTcombConfig) {

  const cwd = process.cwd();

  // define user scala configuration (usc) file path
  const uscFilePath = path.resolve(cwd, './metarpheus-config.scala');
  // set config (cfg) to usc file path if exists, otherwise fallback on default config
  const defaultScalaConfig = path.resolve(__dirname, 'config.scala'); // eslint-disable-line max-len
  // TODO: fs.existsSync is deprecated
  const cfg = fs.existsSync(uscFilePath) && uscFilePath || defaultScalaConfig;
  logger.metarpheus(`Using scala config: ${cfg}`);
  // define output (otp) file path
  const otp = metarpheusTcombConfig.intermRepIn;
  const { apiPath } = metarpheusTcombConfig;
  // compose metarpheus command
  const metarpheusJar = path.resolve(homeDir, '.metarpheus', 'metarpheus.jar');
  const metarpheusCmd = [
    'java',
    `-jar ${metarpheusJar}`,
    `--config=${cfg}`,
    `--output=${otp}`,
    `${apiPath}`
  ];

  // exec cmd syncronously
  logger.metarpheus(`Starting ${buildCmdForLogging(metarpheusCmd)}`);
  execSync(buildCmdForExecuting(metarpheusCmd));
  logger.metarpheus(`Finished ${buildCmdForLogging(metarpheusCmd)}`);


  // METARPHEUS-TCOMB
  logger.metarpheus('Starting metarpheus-tcomb');
  const {
    overrides,
    modelPrelude,
    apiPrelude,
    apiModelPrefix,
    renameModel,
    intermRepIn
  } = metarpheusTcombConfig;
  // use metarpheus-tcomb node api to generate model and api
  const { model, api } = metarpheusTcomb({
    intermRep: require(intermRepIn),
    config: {
      overrides,
      modelPrelude,
      apiPrelude,
      apiModelPrefix,
      renameModel
    }
  });
  logger.metarpheus('Finished metarpheus-tcomb');
  return { model, api };
}
