import fs from 'fs';
import path from 'path';
import { lint } from 'stylelint';
import { red } from 'chalk';

const cwd = process.cwd();

function readConfigInDir(dir) {
  const stylelintrc = path.resolve(dir, '.stylelintrc');
  return fs.existsSync(stylelintrc) && JSON.parse(fs.readFileSync(stylelintrc));
}

function getConfig() {
  const baseConfig = require('./stylelintrc.json');
  const userStylelintrc = readConfigInDir(cwd);

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
  .then(({ output, errored }) => {
    console.log(output); // eslint-disable-line no-console
    if (errored) {
      process.exit(1);
    }
  })
  .catch((err) => {
    console.log(red(err.stack)); // eslint-disable-line no-console
    process.exit(1);
  });
