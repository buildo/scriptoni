import os from 'os';
import request from 'request';
import fs from 'fs';
import path from 'path';
import { logger } from '../../util';

const homeDir = os.homedir();
const metarpheusPath = path.resolve(homeDir, '.metarpheus');

const getLatestMetarpheusFileInfo = function() {
  
  logger.metarpheus(`Checking metarpheus.jar updates...`);

  const options = {
    baseUrl: 'https://api.github.com',
    uri: '/repos/buildo/metarpheus/releases/latest',
    method: 'GET',
    headers: {'user-agent': 'node.js'},
    json: true
  };

  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if(!err && res.statusCode === 200) {
        const asset = body.assets.find(a => a.name === 'metarpheus.jar');
        if (!asset) {
          reject('metarpheus.jar not found');
        }
        else {
          resolve({
            url: asset.browser_download_url,
            size: asset.size
          });
        }
      } else {
        reject(err || res.statusCode);
      }
    })
  });
};

const getLocalFileSize = function() {
  try {
    return fs.statSync(metarpheusPath).size;
  } catch(err) {
    return 0;
  }
};

const downloadFile = function(url) {
  if (!fs.existsSync(metarpheusPath)) {
    fs.mkdirSync(metarpheusPath);
  }
  const file = fs.createWriteStream(path.resolve(metarpheusPath, 'metarpheus.jar'));

  logger.metarpheus(`Downloading metarpheus jar from '${url}'`);
  request
    .get(url)
    .on('response', response => {
      if (response.statusCode === 404) {
        throw new Error(`${METARPHEUS_URL} not found!`);
      }
    })
    .on('error', (err) => logger.metarpheus(err))
    .pipe(file);

  file.on('close', () => {
    logger.metarpheus(`File downloaded at: ${metarpheusPath}`);
  });
};

const downloadIfChanged = function(latestFileInfo) {
  const localFileSize = getLocalFileSize();
  if (!localFileSize || localFileSize !== latestFileInfo.size) {
    downloadFile(latestFileInfo.url);
  } else {
    logger.metarpheus('metarpheus.jar is up-to-date');
  }
};

export default function download() {
  getLatestMetarpheusFileInfo()
    .then(downloadIfChanged)
    .catch(logger.metarpheus);
}
