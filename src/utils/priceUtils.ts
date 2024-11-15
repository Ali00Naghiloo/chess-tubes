export const calcDiscount = (price: string | number, discount?: string | number): number => {
  if (discount == null) {
    return Number(price);
  }
  const discountPrice = (Number(price) * Number(discount)) / 100;

  const divide = Number(price) - discountPrice;

  return divide;
};

export const calcDiscountPercent = (
  total: string | number,
  discountPrice: string | number
): number => {
  if (discountPrice == null || discountPrice === 0) {
    return 0;
  }

  return (Number(discountPrice) * 100) / Number(total);
};
