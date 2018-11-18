import { execSync } from 'child_process';
import { getParsedArgs } from '../util';
import minimist = require('minimist');
import omit = require('lodash/omit');
import { ScriptoniOptions } from '../model';

export default function execCommand(
  cmd: string,
  defaultArgs: { _?: string[] } & { [k: string]: any },
  logger: debug.IDebugger
) {
  // do not pass scriptoni's CLI options to the third-party command
  const commandArgs = omit(getParsedArgs(), Object.keys(ScriptoniOptions.props));

  const args: minimist.ParsedArgs = {
    ...defaultArgs,
    ...commandArgs,
    _: commandArgs._.length > 0 ? commandArgs._ : defaultArgs._ || []
  };

  const command = [
    cmd,
    ...args._,
    ...Object.keys(args)
      .filter(k => k !== '_')
      .map(k => (typeof args[k] === 'boolean' ? `--${k}` : `--${k} ${args[k]}`))
  ].join(' ');

  logger(`Running  ${command}`);

  try {
    execSync(command, { stdio: 'inherit' });
  } catch (err) {
    process.exit(1);
  }
}
