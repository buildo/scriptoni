import * as fs from 'fs';
import { structuredPatch, createTwoFilesPatch } from 'diff';
import chalk from 'chalk';
import getMetarpheusConfig from '../metarpheus/config';
import { runMetarpheusIoTs } from '../metarpheus/run';
import { logger, getScriptoniOptions } from '../../util';

const { green, red } = chalk;
const options = getScriptoniOptions();

const metarpheusConfig = getMetarpheusConfig(options);

const { model, api } = runMetarpheusIoTs(metarpheusConfig);

function colorLine(line: string): string {
  switch (line[0]) {
    case '+':
      return green(line);
    case '-':
      return red(line);
    default:
      return line;
  }
}

function colorizePatch(patch: string): string {
  return patch
    .split('\n')
    .map(colorLine)
    .join('\n');
}

// API diff
logger.metarpheusDiff('Diffing api files...');
const apiNew = fs.readFileSync(metarpheusConfig.apiOut, 'utf-8');
const apiExitCode = structuredPatch('', '', api, apiNew, '', '').hunks.length === 0 ? 0 : 1;
const apiOutput = colorizePatch(createTwoFilesPatch('current', 'new', api, apiNew, '', ''));

if (apiExitCode !== 0) {
  console.log(apiOutput);
}

// model diff
logger.metarpheusDiff('Diffing models files...');
const modelNew = fs.readFileSync(metarpheusConfig.modelOut, 'utf-8');
const modelExitCode = structuredPatch('', '', model, modelNew, '', '').hunks.length === 0 ? 0 : 1;
const modelOutput = colorizePatch(createTwoFilesPatch('current', 'new', model, modelNew, '', ''));

if (modelExitCode !== 0) {
  console.log(modelOutput);
}

// exit with code from diffs
process.exit(modelExitCode || apiExitCode);
