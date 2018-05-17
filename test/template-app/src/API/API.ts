export const getRandomName = (length: number) => {
  return fetch(`http://uinames.com/api/?minlen=${length}&maxlen=${length}`).then(res => res.json()).then(res => {
    return `${res.name} ${res.surname}`;
  }) as Promise<string>;
};
