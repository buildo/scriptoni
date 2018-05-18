const resolve = require('path').resolve;
const runCommands = require('./runCommands');

const templateDir = resolve(__dirname, 'template-app');
const scriptoniDir = resolve(__dirname, '..');

module.exports = () => {
  console.log();
  console.log();
  console.log('🕒 Preparing to run the tests! This will take a few minutes...');
  console.log('🕒 Please be patient (or smart and improve `scriptoni/test/globalSetup.js`)');
  console.log();
  return runCommands([
    `cd ${scriptoniDir}`,
    'yarn build',
    `cd ${templateDir}`,
    'yarn --no-lockfile',
    'rm -rf node_modules/@buildo/bento/node_modules/scriptoni'
  ]);
};
