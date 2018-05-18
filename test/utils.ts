import { resolve } from 'path';
import { spawn } from 'child_process';

export const templateDir = resolve(__dirname, 'template-app');

export function runCommands(commands: string[]) {
  return new Promise((resolve, reject) => {
    const shell = spawn('bash', [], { stdio: 'inherit' });
    console.log(shell);
    shell.stdin.write(commands.join(' && '));
    shell.on('exit', code => {
      if (code === 1) {
        reject();
      } else {
        resolve();
      }
    });
  });
}
