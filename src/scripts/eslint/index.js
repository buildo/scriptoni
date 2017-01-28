import fs from 'fs';
import path from 'path';
import { CLIEngine } from 'eslint';
import { resolveInSrc } from '../../util';

const baseConfig = require(resolveInSrc('eslint/eslintrc.json'));

const cli = new CLIEngine({ baseConfig });
const formatter = cli.getFormatter('stylish');

const report = cli.executeOnFiles(['src']);
console.log(formatter(report.results));     // eslint-disable-line no-console
