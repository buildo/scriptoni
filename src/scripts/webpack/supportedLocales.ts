import * as fs from 'fs';

const localeFileMatch = /^[a-z]+\.json$/;

export default function getSupportedLocales(localesPath: string): string[] {
  return fs
    .readdirSync(localesPath)
    .filter(localePath => {
      return !!localeFileMatch.exec(localePath);
    })
    .map(localePath => {
      return localePath.split('.')[0];
    });
}
