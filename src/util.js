import path from 'path';
import debug from 'debug';
debug.enable('scripto:*');

export const logger = {
  metarpheus: debug('scripto:metarpheus'),
  metarpheusDiff: debug('scripto:metarpheus-diff')
};

export function resolveInSrc(folder) {
  return path.resolve(__dirname, '../src/scripts/', folder);
}
