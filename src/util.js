import debug from 'debug';
debug.enable('scriptoni:*');

export const logger = {
  metarpheus: debug('scriptoni:metarpheus'),
  metarpheusDiff: debug('scriptoni:metarpheus-diff'),
  lint: debug('scriptoni:lint')
};
