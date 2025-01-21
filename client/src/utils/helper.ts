export const getDiscount = (originalPrice: number, discountedPrice: number) =>
  (((originalPrice - discountedPrice) / originalPrice) * 100).toFixed(2);

export const getOrderCode = (id: string = "") => {
  return `NIK-${id.slice(0, 6)}`;
};
