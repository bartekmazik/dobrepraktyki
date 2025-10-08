const vowels = ["a", "e", "i", "o", "u", "y", "ą", "ę", "ó"];

export default function countVowels(word: string) {
  let counter = 0;
  word
    .toLowerCase()
    .split("")
    .map((symbol) => {
      if (vowels.includes(symbol)) {
        counter = counter + 1;
      }
    });
  return counter;
}
