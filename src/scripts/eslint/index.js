import { CLIEngine } from 'eslint';
import baseConfig from './eslintrc';

const cli = new CLIEngine({ baseConfig });
const formatter = cli.getFormatter('stylish');

const report = cli.executeOnFiles(['src']);
console.log(formatter(report.results));     // eslint-disable-line no-console
