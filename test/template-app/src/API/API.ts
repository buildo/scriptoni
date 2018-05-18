const { apiEndpoint } = JSON.parse(process.env.config!);

export const getRandomName = (length: number) => {
  return fetch(`${apiEndpoint}/?minlen=${length}&maxlen=${length}`).then(res => res.json()).then(res => {
    return `${res.name} ${res.surname}`;
  }) as Promise<string>;
};
