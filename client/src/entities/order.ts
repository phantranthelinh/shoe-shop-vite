export type Order = {
  shippingInfo: {
    address: string;
    customerName: string;
    phoneNumber: string;
    province: string;
    district: string;
    ward: string;
  };
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  orderItems: Array<{
    name: string;
    qty: number;
    image: string;
    product: string;
    _id: string;
  }>;
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
