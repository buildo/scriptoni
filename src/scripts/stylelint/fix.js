import fs from 'fs';
import path from 'path';
import glob from 'glob';
import postcss from 'postcss';
import scss from 'postcss-scss';
import stylefmt from 'stylefmt';
import { logger } from '../../util';
import minimist from 'minimist';
const args = minimist(process.argv.slice(2));
const scssFolder = args._[0] || 'src/**/*.scss';

const scssPath = path.resolve(process.cwd(), scssFolder);
logger.lintStyle(`Searching .scss files in: ${scssPath}.`);


function getStyleLintrc() {
  const stylelintrc = path.resolve(process.cwd(), '.stylelintrc');
  return fs.existsSync(stylelintrc) ? stylelintrc : path.resolve(__dirname, './stylelintrc.json');
}

const stylefmtConfig = {
  configFile: getStyleLintrc(),
  configBaseDir: process.cwd()
};

logger.lintStyle('Loaded configuration:', stylefmtConfig);

glob(scssPath, (err, files) => {
  if (err) {
    throw err;
  }

  logger.lintStyle(`Found ${files.length} 'scss' files.`);

  Promise.all(
    files.map((f) => {
      const css = fs.readFileSync(f, 'utf-8');
      return postcss([stylefmt(stylefmtConfig)])
        .process(css, {
          from: f,
          syntax: scss
        })
        .then(({ css: formatted }) => {
          if (css !== formatted) {
            logger.lintStyle(`Formatting ${f}...`);
            return fs.writeFileSync(f, formatted);
          }
          logger.lintStyle(`Skipping ${f}.`);
          return undefined;
        });
    })
  )
  .then(() => {
    logger.lintStyle('Format is complete!');
  });
});
