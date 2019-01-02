import * as path from 'path';

const configPath = path.join(__dirname, '.prettierrc.js');
const files = '**/*.{js,jsx,ts,tsx,scss}';

export default function getCommandsAndDefaultArgs(
  writeOrListDifferent: 'write' | 'list-different'
) {
  return {
    config: configPath,
    [writeOrListDifferent]: files
  };
}
