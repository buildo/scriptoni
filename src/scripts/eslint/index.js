import { CLIEngine } from 'eslint';

const baseConfig = require('./eslintrc.json');

const cli = new CLIEngine({ baseConfig });
const formatter = cli.getFormatter('stylish');

const report = cli.executeOnFiles(['src']);
console.log(formatter(report.results));     // eslint-disable-line no-console

if (report.errorCount > 0) {
  process.exit(1);
}
