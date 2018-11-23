import { execSync } from 'child_process';
import minimist = require('minimist');

export default function execCommand(
  cmd: string,
  args: minimist.ParsedArgs,
  logger: debug.IDebugger
): Promise<void> {
  const command = [
    cmd,
    ...args._,
    ...Object.keys(args)
      .filter(k => k !== '_')
      .map(k => (typeof args[k] === 'boolean' ? `--${k}` : `--${k} ${args[k]}`))
  ].join(' ');

  logger(`Running  ${command}`);

  return new Promise((resolve, reject) => {
    try {
      execSync(command, { stdio: 'inherit' });
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
