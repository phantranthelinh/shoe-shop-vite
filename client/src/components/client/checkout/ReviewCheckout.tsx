/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/store/cart.store";
import { useMemo } from "react";

const ReviewCheckout = ({ form }: any) => {
  const { cartItems } = useCart();
  const subTotal = useMemo(() => {
    return cartItems.reduce(
      (total: number, value: { totalPrice: number }) =>
        total + value.totalPrice,
      0
    );
  }, [cartItems]);

  const handleCheckout = () => {
    console.log(form.getValues());
  };
  return (
    <div className="bg-slate-50 px-6 py-10 w-full h-full">
      <h6 className="text-lg">Xem lại đơn hàng của bạn</h6>
      <ScrollArea className="h-[260px]">
        <div className="flex flex-col gap-5 mt-6">
          {cartItems.map((item: any) => (
            <div className="flex gap-3 mf:gap-5 border-0">
              <div className="flex justify-center items-center border rounded-lg w-[100px] h-[100px]">
                <img src={item?.image} alt={item?.name} className="w-full" />
              </div>
              <div className="flex flex-col justify-between w-full">
                <div className="font-bold text-base">{item?.name}</div>
                <div>x {item.quantity}</div>
                <div className="font-bold text-md">{item?.price}</div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex flex-col gap-3 mt-6 text-base">
        <div className="flex justify-between">
          <span>Tổng cộng </span>
          <span className="font-bold">{subTotal} VNĐ</span>
        </div>
        <div className="flex justify-between">
          <span>Phí vận chuyển</span>
          <span className="font-bold">0 VNĐ</span>
        </div>
        <div className="flex justify-between">
          <span>Thành tiền</span>
          <span className="font-bold">{subTotal} VNĐ</span>
        </div>
      </div>
      <Button onClick={handleCheckout} className="mt-4 w-full">
        Thanh toán
      </Button>
    </div>
  );
};

export default ReviewCheckout;
