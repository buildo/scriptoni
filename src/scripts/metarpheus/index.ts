import * as fs from 'fs';
import * as path from 'path';
import { logger, getScriptoniOptions } from '../../util';
import { runMetarpheusIoTs } from './run';
import getMetarpheusConfig from './config';

const options = getScriptoniOptions();

function mkDirs(filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.mkdir(filePath, error => {
      if (error) {
        if (error.code === 'ENOENT') {
          return mkDirs(path.dirname(filePath))
            .then(() => mkDirs(filePath))
            .then(resolve)
            .catch(reject);
        } else {
          reject(error);
        }
      }
      resolve();
    });
  });
}

function mkDirsIfNotExist(filePath: string): Promise<void> {
  if (!fs.existsSync(filePath)) {
    return mkDirs(filePath);
  }
  return Promise.resolve();
}

const metarpheusConfig = getMetarpheusConfig(options);

const apiOutDir = path.dirname(metarpheusConfig.apiOut);
const modelOutDir = path.dirname(metarpheusConfig.modelOut);

const { model, api } = runMetarpheusIoTs(metarpheusConfig);

// create dirs if don't exist
mkDirsIfNotExist(apiOutDir)
  .then(() => mkDirsIfNotExist(modelOutDir))
  .then(() => {
    // write api in api output file
    logger.metarpheus(`Writing ${metarpheusConfig.apiOut}`);
    fs.writeFileSync(metarpheusConfig.apiOut, api);
    logger.metarpheus('Finished!');

    // write model in model output file
    logger.metarpheus(`Writing ${metarpheusConfig.modelOut}`);
    fs.writeFileSync(metarpheusConfig.modelOut, model);
    logger.metarpheus('Finished!');
  })
  .catch(e => {
    logger.metarpheus(e);
    process.exit(1);
  });
