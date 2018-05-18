const resolve = require('path').resolve;
const spawn = require('child_process').spawn;

const templateDir = resolve(__dirname, 'template-app');

function runCommands(commands) {
  return new Promise((resolve, reject) => {
    const shell = spawn('bash', ['-c', commands.join(' && ')], { stdio: 'inherit' });
    shell.on('exit', code => {
      if (code === 1) {
        reject();
      } else {
        resolve();
      }
    });
  });
}

module.exports = () => {
  console.log();
  console.log();
  console.log('🕒 Preparing to run the tests! This will take a few minutes...');
  console.log('🕒 Please be patient (or smart and improve `scriptoni/test/globalSetup.js`)');
  console.log();
  return runCommands([
    `cd ${templateDir}`,
    'cd ../../',
    'yarn build',
    `cd ${templateDir}`,
    'yarn --no-lockfile'
  ]);
};
