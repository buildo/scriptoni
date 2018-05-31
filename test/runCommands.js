const spawn = require('child_process').spawn;

const isWin = process.platform === 'win32';

module.exports = function runCommands(commands) {
  return new Promise((resolve, reject) => {
    try {
      const shell = spawn(
        isWin ? 'cmd' : 'bash',
        (isWin ? ['/c'] : ['-c']).concat([commands.join(' && ')]),
        { stdio: 'inherit' }
      );
      shell.on('close', code => {
        if (code === 1) {
          reject(1);
        } else {
          resolve(0);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}
