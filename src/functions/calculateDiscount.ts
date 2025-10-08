export default function calculateDiscount(price: number, discount: number) {
  if (discount > 1 || discount < 0) {
    throw new Error("Discount value out of range");
  }
  if (price < 0) {
    throw new Error("Price value cannot be negative");
  }
  return price - discount * price;
}
