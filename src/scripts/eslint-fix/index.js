import { CLIEngine } from 'eslint';
import { logger } from '../../util';

const baseConfig = require('../eslint/eslintrc.json');

const cli = new CLIEngine({
  baseConfig,
  fix: true
});

const report = cli.executeOnFiles(['src']);

CLIEngine.outputFixes(report);

if (report.errorCount > 0) {
  logger.lint(`There are still ${report.errorCount} errors and ${report.warningCount} warnings I can't fix!`);
} else {
  logger.lint('No errors left to fix');
}
