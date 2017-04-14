import fs from 'fs';
import path from 'path';
import debug from 'debug';
debug.enable('scriptoni:*');


export function loadFileFromArgument(args, key, defaultPath) {
  const filePath = path.join(process.cwd(), args[key] ? args[key] : defaultPath);
  return fs.existsSync(filePath) && require(filePath);
}

export const logger = {
  metarpheus: debug('scriptoni:metarpheus'),
  metarpheusDiff: debug('scriptoni:metarpheus-diff'),
  lint: debug('scriptoni:lint'),
  lintStyle: debug('scriptoni:lint-style'),
  webpack: debug('scriptoni:webpack')
};
