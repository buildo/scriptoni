const resolve = require('path').resolve;
const runCommands = require('./runCommands');

const scriptoniDir = resolve(__dirname, '..');
const templateDir = resolve(__dirname, 'template-app');

module.exports = () => {
  console.log();
  console.log();
  console.log('🕒 Preparing to run the tests! This will take a few minutes...');
  console.log('🕒 Please be patient (or smart and improve `scriptoni/test/globalSetup.js`)');
  console.log();
  return runCommands([`cd ${scriptoniDir}`, 'yarn build', `cd ${templateDir}`]);
};
