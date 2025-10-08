export default function fibonacci(number: number): number {
  if (number < 0) {
    throw new Error("non-negative only");
  }
  if (number === 0) return 0;
  if (number === 1) return 1;

  let n1 = 0;
  let n2 = 1;

  for (let i = 2; i <= number; i++) {
    const next = n1 + n2;
    n1 = n2;
    n2 = next;
  }
  return n2;
}
