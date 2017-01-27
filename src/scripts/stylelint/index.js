import fs from 'fs';
import path from 'path';
import { lint } from 'stylelint';
import { red } from 'chalk';
import { resolveInSrc } from '../../util';

const cwd = process.cwd();

function readConfigInDir(dir) {
  const stylelintrc = path.resolve(dir, '.stylelintrc');
  return fs.existsSync(stylelintrc) && JSON.parse(fs.readFileSync(stylelintrc));
}

function getConfig() {
  const userStylelintrc = readConfigInDir(cwd);
  const baseConfig = readConfigInDir(resolveInSrc('stylelint'));

  return {
    config: {
      ...baseConfig,
      ...(userStylelintrc || {})
    },
    configBasedir: userStylelintrc ? cwd : '../../../'
  };
}

const options = {
  ...getConfig(),
  files: path.resolve(cwd, 'src/**/*.scss'),
  syntax: 'scss',
  formatter: 'string'
};

lint(options)
  .then(({ output }) => console.log(output)) // eslint-disable-line no-console
  .catch((err) => console.log(red(err.stack))); // eslint-disable-line no-console
