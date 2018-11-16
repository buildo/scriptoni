import { execSync } from 'child_process';
import { Args } from '../model';
import { getArgs } from '../util';

export default function execCommand(cmd: string, defaultArgs: Args, logger: debug.IDebugger) {
  const userArgs = getArgs();

  const args: Args = {
    ...defaultArgs,
    ...userArgs,
    _: userArgs._.length > 0 ? userArgs._ : ((defaultArgs._ || []) as any)
  };

  const command = [
    cmd,
    ...args._,
    ...(Object.keys(args) as (keyof Args)[])
      .filter(k => k !== '_')
      .map(k => {
        if (typeof args[k] === 'boolean') {
          return `--${k}`;
        } else {
          return `--${k} ${args[k]}`;
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
