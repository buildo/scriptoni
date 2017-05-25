import fs from 'fs';
import path from 'path';

const srcPath = path.resolve(__dirname, 'scripts');
const libPath = path.resolve(__dirname, '..', 'lib', 'scripts');

const copyToLib = (file) => {
  fs.writeFileSync(
    path.resolve(libPath, file),
    fs.readFileSync(path.resolve(srcPath, file))
  );
};

const files = [
  'eslint/eslintrc.json',
  'stylelint/stylelintrc.json',
  'metarpheus/config.scala',
  'webpack/tsconfig.json'
];

files.map(copyToLib);
