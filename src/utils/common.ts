export const createName = (names: string[], name: string) => {
  let index = 0;
  let same = true;
  while (same) {
    const uniqName = `${name}${++index}`;
    same = names.some((v) => v === uniqName);
  }
  return `${name}${index}`;
};
