import { execSync } from 'child_process';
import minimist from 'minimist';

export default function execCommand(cmd, defaultArgs, logger) {

  const userArgs = minimist(process.argv.slice(2));

  const args = {
    ...defaultArgs,
    ...userArgs,
    _: userArgs._.length > 0 ? userArgs._ : defaultArgs._
  };

  const command = [
    cmd,
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

  logger(`Running  ${command}`);

  try {
    execSync(command, { stdio: 'inherit' });
  } catch (err) {
    process.exit(1);
  }
}
