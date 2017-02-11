import fs from 'fs';
import path from 'path';
import { logger } from '../../util';
import runMetarpheusTcomb from './run';
import metarpheusTcombConfig from './config';
import download from './download';

const args = process.argv.slice(2);

function mkDirs(filePath) {
  return new Promise((resolve, reject) => {
    fs.mkdir(filePath, (error) => {
      if (error) {
        if (error.code === 'ENOENT') {
          return mkDirs(path.dirname(filePath))
            .then(() => mkDirs(filePath))
            .then(resolve)
            .catch(reject);
        }
        else {
          reject(error);
        }
      }
      resolve();
    });
  });
}

function mkDirsIfNotExist(filePath) {
  if (!fs.existsSync(filePath)) {
    return mkDirs(filePath);
  }
  return Promise.resolve();
}

download()
  .then(() => {
    const { model, api } = runMetarpheusTcomb(metarpheusTcombConfig, args);

    const apiOutDir = path.dirname(metarpheusTcombConfig.apiOut);
    const modelOutDir = path.dirname(metarpheusTcombConfig.modelOut);

    // create dirs if don't exist
    mkDirsIfNotExist(apiOutDir)
      .then(() => mkDirsIfNotExist(modelOutDir))
      .then(() => {
        // write api in api output file
        logger.metarpheus(`Writing ${metarpheusTcombConfig.apiOut}`);
        fs.writeFileSync(metarpheusTcombConfig.apiOut, api);
        logger.metarpheus('Finished!');

        // write model in model output file
        logger.metarpheus(`Writing ${metarpheusTcombConfig.modelOut}`);
        fs.writeFileSync(metarpheusTcombConfig.modelOut, model);
        logger.metarpheus('Finished!');
      })
      .catch(logger.metarpheus);
  });
