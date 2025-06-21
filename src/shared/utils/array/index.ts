export const hasDuplicatesIgnoreCase = (arr: string[]): boolean => {
  const seen = new Set<string>();
  for (const str of arr) {
    const lower = str.toLowerCase();
    if (seen.has(lower)) {
      return true;
    }
    seen.add(lower);
  }
  return false;
};
