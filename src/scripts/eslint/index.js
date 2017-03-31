import path from 'path';
import { execSync } from 'child_process';
import minimist from 'minimist';
import map from 'lodash/map';
import t from 'tcomb';

const cwd = process.cwd();

const userArgs = minimist(process.argv.slice(2));

const args = {
  cache: true,
  ...userArgs,
  _: userArgs._.length > 0 ? userArgs._ : ['src']
};

const eslintCmd = [
  path.resolve(cwd, 'node_modules', 'eslint', 'bin', 'eslint.js'),
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
];

try {
  execSync(eslintCmd.join(' '), { stdio: 'inherit' });
} catch (err) {
  process.exit(1);
}

