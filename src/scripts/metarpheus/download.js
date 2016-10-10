import request from 'request';
import fs from 'fs';
import { logger } from '../../util';

/* eslint-disable max-len */
const METARPHEUS_URL = 'https://github.com/buildo/metarpheus/releases/download/0.1.0-escalapio/metarpheus.jar';
/* eslint-enable max-len */

export default function download() {
  const metarpheusPath = `${__dirname}/metarpheus.jar`;
  const file = fs.createWriteStream(metarpheusPath);

  file.on('close', () => {
    logger.metarpheus(`File downloaded at: ${metarpheusPath}`);
  });

  logger.metarpheus('Downloading metarpheus jar...');
  request
    .get(METARPHEUS_URL)
    .on('response', response => {
      if (response.statusCode === 404) {
        throw new Error(`${METARPHEUS_URL} not found!`);
      }
    })
    .on('error', (err) => logger.metarpheus(err))
    .pipe(file);
}
