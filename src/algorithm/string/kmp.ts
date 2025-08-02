const makeKmpTable = (pattern: string): number[] => {
  const table = Array.from<number>({ length: pattern.length }).fill(0);

  let j = 0;

  for (let i = 1; i < pattern.length; i++) {
    while (j > 0 && pattern[i] !== pattern[j]) {
      j = table[j - 1] ?? 0;
    }

    if (pattern[i] === pattern[j]) {
      table[i] = ++j;
    }
  }

  return table;
};

export const kmpSearch = (text: string, pattern: string): number[] => {
  const kmpTable = makeKmpTable(pattern);

  const result: number[] = [];

  let j = 0;

  for (let i = 0; i < text.length; i++) {
    while (j > 0 && text[i] !== pattern[j]) {
      j = kmpTable[j - 1] ?? 0;
    }

    if (text[i] === pattern[j]) {
      if (j === pattern.length - 1) {
        result.push(i - (pattern.length - 1));

        j = kmpTable[j] ?? 0;
      } else {
        j++;
      }
    }
  }

  return result;
};

kmpSearch("abacaaba", "abacaaba");
