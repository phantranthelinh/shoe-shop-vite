export const getDiscount = (originalPrice: number, discountedPrice: number) =>
  (((originalPrice - discountedPrice) / originalPrice) * 100).toFixed(2);
