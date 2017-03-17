import fs from 'fs';
import path from 'path';
import baseConfig from './stylelintrc.json';

function readConfigInDir(dir) {
  const stylelintrc = path.resolve(dir, '.stylelintrc');
  return fs.existsSync(stylelintrc) && JSON.parse(fs.readFileSync(stylelintrc));
}

const userStylelintrc = readConfigInDir(process.cwd());


export default {
  config: {
    ...baseConfig,
    ...(userStylelintrc || {})
  },
  configBaseDir: userStylelintrc ? process.cwd() : '../../../'
};
