const resolve = require('path').resolve;
const _exec = require('child_process').exec;
const promisify = require('util').promisify;

const exec = promisify(_exec);

const templateDir = resolve(__dirname, 'template-app');

function runCommands(commands) {
  return exec(commands.join(' && ')).catch(err => {
    console.error(err);
    throw err;
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
    'yarn --no-lockfile',
    'rm -rf node_modules/scriptoni',
    'cd ../../',
    'yarn build',
    `cd ${templateDir}`,
    'yarn add --no-lockfile ../../'
  ]);
};
