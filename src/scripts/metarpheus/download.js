import os from 'os';
import request from 'request';
import rp from 'request-promise';
import fs from 'fs';
import path from 'path';
import progress from 'progress';
import { logger } from '../../util';

const homeDir = os.homedir();
const metarpheusPath = path.resolve(homeDir, '.metarpheus');
const metarpheusFileName = 'metarpheus.jar';

const getLatestMetarpheusFileInfo = function() {

  logger.metarpheus(`Checking for ${metarpheusFileName} updates...`);

  const options = {
    baseUrl: 'https://api.github.com',
    uri: '/repos/buildo/metarpheus/releases/latest',
    method: 'GET',
    headers: { 'user-agent': 'node.js' },
    json: true,
    simple: true
  };

  return rp(options)
    .then(body => {
      const asset = body.assets.find(a => a.name === metarpheusFileName);
      if (!asset) {
        return Promise.reject(`${metarpheusFileName} not found in latest release.`);
      }
      return ({
        url: asset.browser_download_url,
        size: asset.size
      });
    });
};

const getLocalFileSize = function() {
  try {
    return fs.statSync(path.resolve(metarpheusPath, metarpheusFileName)).size;
  } catch (err) {
    return 0;
  }
};

const downloadFile = function(url) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(metarpheusPath)) {
      fs.mkdirSync(metarpheusPath);
    }
    const file = fs.createWriteStream(path.resolve(metarpheusPath, metarpheusFileName));

    logger.metarpheus(`Downloading metarpheus jar from '${url}'`);

    request
      .get(url)
      .on('response', response => {
        if (response.statusCode === 404) {
          reject(`${url} not found!`);
        } else {
          const len = parseInt(response.headers['content-length'], 10);
          const progressBar = new progress('  downloading [:bar] :percent eta: :etas', {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: len
          });

          response.on('data', chunk => {
            progressBar.tick(chunk.length);
          });

          response.on('end', () => {
            logger.metarpheus(`File downloaded at ${metarpheusPath}`);
            resolve();
          });
        }
      })
      .on('error', (err) => {
        reject(err);
      })
      .pipe(file);
  });
};

const downloadIfChanged = function(latestFileInfo) {
  const localFileSize = getLocalFileSize();
  if (!localFileSize || localFileSize !== latestFileInfo.size) {
    return downloadFile(latestFileInfo.url);
  } else {
    logger.metarpheus(`${metarpheusFileName} is up-to-date`);
  }
};

export default function download() {
  return getLatestMetarpheusFileInfo()
    .then(downloadIfChanged);
}
