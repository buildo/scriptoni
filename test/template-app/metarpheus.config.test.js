const path = require('path');

module.exports = {
  apiPaths: [path.resolve(__dirname, './fake-api-src')],
  apiPrelude: 'API_PRELUDE',
  modelPrelude: 'MODEL_PRELUDE'
};
