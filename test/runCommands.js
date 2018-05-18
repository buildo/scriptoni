const spawn = require('child_process').spawn;

module.exports = function runCommands(commands) {
  return new Promise((resolve, reject) => {
    try {
      const shell = spawn('bash', ['-c', commands.join(' && ')], { stdio: 'inherit' });
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
