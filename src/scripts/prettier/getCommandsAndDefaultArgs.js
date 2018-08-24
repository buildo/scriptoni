import path from 'path';

const cwd = process.cwd();
const command = path.resolve(cwd, 'node_modules', 'scriptoni', 'node_modules', 'prettier', 'bin-prettier.js');
const configPath = path.join(__dirname, '.prettierrc.js');
const files = '{**/*,*}.{js,jsx,ts,tsx}';

export default function getCommandsAndDefaultArgs(writeOrListDifferent) {
  return {
    command,
    defaultArgs: {
      config: configPath,
      [writeOrListDifferent]: files
    }
  };
}
