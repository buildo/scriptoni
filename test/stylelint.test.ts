import * as fs from 'fs';
import * as path from 'path';
import { runCommands, templateDir } from './utils';

describe('stylelint check', () => {
  it('no errors in template', async () => {
    return runCommands([`cd ${templateDir}`, 'yarn lint-style']);
  }, 20000);

  it('exits with 1 if has errors', async () => {
    fs.writeFileSync(path.resolve(templateDir, 'src/temp.scss'), '.input { margin-left: 5px }');
    const exitCode: 0 | 1 = await runCommands([`cd ${templateDir}`, 'yarn lint-style']).catch(
      x => x
    );
    fs.unlinkSync(path.resolve(templateDir, 'src/temp.scss'));

    // has found errors
    expect(exitCode).toBe(1);
  }, 20000);
});
