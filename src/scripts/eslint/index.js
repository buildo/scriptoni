import fs from 'fs';
import path from 'path';
import { CLIEngine } from 'eslint';
import { resolveInSrc } from '../../util';

function readConfigInDir(dir) {
  const eslintrc = path.resolve(dir, '.eslintrc');
  return fs.existsSync(eslintrc) && JSON.parse(fs.readFileSync(eslintrc));
}

const baseConfig = readConfigInDir(resolveInSrc('eslint'));

const cli = new CLIEngine({ baseConfig });
const formatter = cli.getFormatter('stylish');

const report = cli.executeOnFiles(['src']);
console.log(formatter(report.results));     // eslint-disable-line no-console
