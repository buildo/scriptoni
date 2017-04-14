import path from 'path';
import { execSync } from 'child_process';
import minimist from 'minimist';
import map from 'lodash/map';
import t from 'tcomb';
import { logger } from '../../util';

const cwd = process.cwd();

const userArgs = minimist(process.argv.slice(2));

const args = {
  ...userArgs,
  _: userArgs._.length > 0 ? userArgs._ : ['src']
};

const stylelintCmd = [
  path.resolve(cwd, 'node_modules', 'stylelint', 'bin', 'stylelint.js'),
  ...map(args, (v, k) => {
    if (k !== '_') {
      if (t.Bool.is(v)) {
        return `--${k}`;
      } else {
        return `--${k} ${v}`;
      }
    } else {
      return v.join(' ');
    }
  })
].join(' ');

logger.lintStyle(`Running  ${stylelintCmd}`);

try {
  execSync(stylelintCmd, { stdio: 'inherit' });
} catch (err) {
  process.exit(1);
}

