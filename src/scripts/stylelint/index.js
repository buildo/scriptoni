import path from 'path';
import { lint } from 'stylelint';
import { red } from 'chalk';
import config from './config';

const options = {
  ...config,
  files: path.resolve(process.cwd(), 'src/**/*.scss'),
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
