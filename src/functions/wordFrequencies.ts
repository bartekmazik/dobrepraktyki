export default function wordFrequencies(text: string): Record<string, number> {
  const result: Record<string, number> = {};
  text
    .toLowerCase()
    .replace(/[.,!?;:()"'`]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .forEach((word) => {
      result[word] = (result[word] ?? 0) + 1;
    });
  return result;
}
