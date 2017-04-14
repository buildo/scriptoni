import path from 'path';
import { execSync } from 'child_process';
import minimist from 'minimist';
import { logger } from '../../util';

const cwd = process.cwd();

const userArgs = minimist(process.argv.slice(2));

const args = {
  cache: true,
  ...userArgs,
  _: userArgs._.length > 0 ? userArgs._ : ['src']
};

const eslintCmd = [
  path.resolve(cwd, 'node_modules', 'eslint', 'bin', 'eslint.js'),
  ...Object.keys(args).map(k => {
    if (k !== '_') {
      if (typeof args[k] === 'boolean') {
        return `--${k}`;
      } else {
        return `--${k} ${args[k]}`;
      }
    } else {
      return args[k].join(' ');
    }
  })
].join(' ');

logger.lint(`Running  ${eslintCmd}`);

try {
  execSync(eslintCmd, { stdio: 'inherit' });
} catch (err) {
  process.exit(1);
}

