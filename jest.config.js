module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: './tsconfig.json'
    }
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json']
};
