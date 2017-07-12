import fs from 'fs';
import { structuredPatch, createTwoFilesPatch } from 'diff';
import { green, red } from 'chalk';
import getMetarpheusConfig from '../metarpheus/config';
import { runMetarpheusTcomb, runMetarpheusIoTs } from '../metarpheus/run';
import { logger } from '../../util';
import download from '../metarpheus/download';

const _args = process.argv.slice(2);
const ts = _args.indexOf('--ts') !== -1;
const args = _args.filter(a => a !== '--ts');

const metarpheusConfig = getMetarpheusConfig(ts);

download()
  .then(() => {

    const { model, api } = (ts ? runMetarpheusIoTs : runMetarpheusTcomb)(metarpheusConfig, args);

    function colorLine(line) {
      switch (line[0]) {
        case '+': return green(line);
        case '-': return red(line);
        default: return line;
      }
    }

    function colorizePatch(patch) {
      return patch.split('\n').map(colorLine).join('\n');
    }

    // API diff
    logger.metarpheusDiff('Diffing api files...');
    const apiNew = fs.readFileSync(metarpheusConfig.apiOut, 'utf-8');
    const apiExitCode = structuredPatch('', '', api, apiNew).hunks.length === 0 ? 0 : 1;
    const apiOutput = colorizePatch(createTwoFilesPatch('current', 'new', api, apiNew));

    if (apiExitCode !== 0) {
      console.log(apiOutput); // eslint-disable-line no-console
    }

    // model diff
    logger.metarpheusDiff('Diffing models files...');
    const modelNew = fs.readFileSync(metarpheusConfig.modelOut, 'utf-8');
    const modelExitCode = structuredPatch('', '', model, modelNew).hunks.length === 0 ? 0 : 1;
    const modelOutput = colorizePatch(createTwoFilesPatch('current', 'new', model, modelNew));

    if (modelExitCode !== 0) {
      console.log(modelOutput); // eslint-disable-line no-console
    }

    // exit with code from diffs
    process.exit(modelExitCode || apiExitCode);
  })
  .catch(e => {
    logger.metarpheus(e);
    process.exit(1);
  });
