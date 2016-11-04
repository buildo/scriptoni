import fs from 'fs';
import path from 'path';
import { lint } from 'stylelint';
import { red } from 'chalk';
import { resolveInSrc } from '../../util';

const cwd = process.cwd();

const stylelinrcFileName = '.stylelintrc';

function getConfigFile() {
  const userStylelintrc = path.resolve(cwd, stylelinrcFileName);
  if (fs.existsSync(userStylelintrc)) {
    return userStylelintrc;
  }
  return path.resolve(resolveInSrc('stylelint'), stylelinrcFileName);
}

const options = {
  configFile: getConfigFile(),
  files: path.resolve(cwd, 'src/**/*.scss'),
  syntax: 'scss',
  formatter: 'string'
};

lint(options)
  .then(({ output }) => console.log(output)) // eslint-disable-line no-console
  .catch((err) => console.log(red(err.stack))); // eslint-disable-line no-console
