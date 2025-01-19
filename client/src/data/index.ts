export const navList = [
  { id: 1, name: "Trang chủ", url: "/" },
  { id: 3, name: "Danh mục", subMenu: true },
  { id: 2, name: "Giới thiệu", url: "/about" },
  { id: 4, name: "Liên hệ", url: "/contact" },
];

export const paymentMethods = [
  {
    id: 1,
    name: "Thanh toán khi nhận hàng (COD)",
    value: "cod",
    icon: "/icons/payment-cod.png",
  },
  {
    id: 2,
    name: "Thanh toán online",
    value: "credit_card",
    icon: "/icons/payment-card.png",
  },
];
