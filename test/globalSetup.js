const resolve = require('path').resolve;
const runCommands = require('./runCommands');

const scriptoniDir = resolve(__dirname, '..');
const templateFilesDir = resolve(__dirname, 'template-files');

module.exports = () => {
  console.log();
  console.log();
  console.log('🕒 Preparing to run the tests! This will take a few minutes...');
  console.log('🕒 Please be patient (or smart and improve `scriptoni/test/globalSetup.js`)');
  console.log();
  return runCommands([
    `cd ${scriptoniDir}`,
    'yarn build',
    `cd ${__dirname}`,
    'npx @buildo/create-bento-app test-app',
    'cd test-app',
    `cp -a ${templateFilesDir}/. .`,
    'yarn remove scriptoni',
    'yarn add ../../'
  ]);
};
