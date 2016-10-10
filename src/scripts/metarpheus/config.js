import fs from 'fs';
import path from 'path';

// get current working directory
const cwd = process.cwd();
// define user javascript config file path
const ujcFilePath = path.resolve(cwd, 'metarpheus-config.js');

// define ujc
require('babel-register')({ // so that config file can be ESwhatever
  only: ujcFilePath,
  babelrc: false,
  presets: [ 'es2015' ]
});
// TODO: fs.existsSync is deprecated
const ujc = fs.existsSync(ujcFilePath) && require(ujcFilePath).default || {};

// default module prelude
const modelPrelude = `// DO NOT EDIT MANUALLY - metarpheus-generated
/* eslint-disable */
import t from 'tcomb';
`;

export default {
  apiPath: path.resolve(cwd, '../api/src/main/scala'),
  modelPrelude,
  apiPrelude: `${modelPrelude}
import * as m from './model';
`,
  apiModelPrefix: 'm.',
  modelOut: path.resolve(cwd, 'src/app/metarpheus/model.js'),
  apiOut: path.resolve(cwd, 'src/app/metarpheus/api.js'),
  intermRepIn: path.resolve(__dirname, 'metarpheus-interm-rep.json'),
  ...ujc,
  overrides: {
    Date: () => 't.Date',
    DateTime: () => 't.Date',
    LocalDate: () => 't.Date', // TODO(gio): fixme? this should be a date only
    OffsetDateTime: () => 't.Date', // TODO(gio): this allows milliseconds and more, parsing should be fixed
    Map: () => 't.Object',
    ...ujc.overrides
  }
};
