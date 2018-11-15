import * as fs from "fs";
import * as path from "path";

const copyToLib = (file: string) => {
  fs.writeFileSync(
    path.resolve("lib", file),
    fs.readFileSync(path.resolve("src", file))
  );
};

const files = [
  "scripts/stylelint/stylelintrc.json",
  "scripts/webpack/tsconfig.json",
  "scripts/prettier/.prettierrc.js"
];

files.map(copyToLib);
