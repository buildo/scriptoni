import path from 'path';

const configPath = path.join(__dirname, '.prettierrc.js');
const files = '{**/*,*}.{js,jsx,ts,tsx}';

export default function getCommandsAndDefaultArgs(writeOrListDifferent) {
  return {
    config: configPath,
    [writeOrListDifferent]: files
  };
}
