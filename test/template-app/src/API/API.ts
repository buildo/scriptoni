import * as config from 'config';

export const getRandomName = (length: number) => {
  return fetch(`${config.apiEndpoint}/?minlen=${length}&maxlen=${length}`).then(res => res.json()).then(res => {
    return `${res.name} ${res.surname}`;
  }) as Promise<string>;
};
