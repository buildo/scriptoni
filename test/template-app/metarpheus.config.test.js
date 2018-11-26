const path = require('path');

module.exports = {
  apiPaths: [path.resolve(__dirname, './fake-api-src')],
  modelOut: 'src/metarpheus-test/model.ts',
  apiOut: 'src/metarpheus-test/api.ts',
  apiPrelude: 'API_PRELUDE\n',
  modelPrelude: 'MODEL_PRELUDE\n',
  modelsForciblyInUse: ['Account']
};
