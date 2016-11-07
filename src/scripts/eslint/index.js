import fs from 'fs';
import path from 'path';
import { CLIEngine } from 'eslint';
import { resolveInSrc } from '../../util';

const cwd = process.cwd();

const eslintrcFileName = '.eslintrc';

function getConfigFile() {
  const userEslintrcFileName = path.resolve(cwd, eslintrcFileName);
  if (fs.existsSync(userEslintrcFileName)) {
    return userEslintrcFileName;
  }
  return path.resolve(resolveInSrc('eslint'), eslintrcFileName);
}

const cli = new CLIEngine({
  configFile: getConfigFile(),
  cwd
});

const formatter = cli.getFormatter('stylish');

const report = cli.executeOnFiles(['src']);
console.log(formatter(report.results));     // eslint-disable-line no-console
