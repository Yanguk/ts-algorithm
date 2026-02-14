const range = (start: number, end: number) =>
  Array.from({ length: end - start }, (_, idx) => idx + start);

const buildLps = (pattern: string): number[] => {
  const table = Array.from<number>({ length: pattern.length }).fill(0);

  let j = 0;

  for (const i of range(1, pattern.length)) {
    while (j > 0 && pattern[i] !== pattern[j]) {
      j = table[j - 1]!;
    }

    if (pattern[i] === pattern[j]) {
      j += 1;

      table[i] = j;
    }
  }

  return table;
};

export const kmpSearch = (text: string, pattern: string): number[] => {
  const kmpTable = buildLps(pattern);

  const result: number[] = [];

  let j = 0;

  for (const i of range(0, text.length)) {
    while (j > 0 && text[i] !== pattern[j]) {
      j = kmpTable[j - 1]!;
    }

    if (text[i] === pattern[j]) {
      // 다 일치 한 경우
      if (j === pattern.length - 1) {
        result.push(i - (pattern.length - 1));

        j = kmpTable[j]!;
      } else {
        j++;
      }
    }
  }

  return result;
};
