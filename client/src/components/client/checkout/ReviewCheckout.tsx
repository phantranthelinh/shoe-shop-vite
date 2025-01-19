/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/store/cart.store";
import { formatCurrencyVND } from "@/utils/format-currency";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useMemo } from "react";

const ReviewCheckout = ({
  handleCheckout,
  form,
}: {
  handleCheckout: (data: any) => void;
  form: any;
}) => {
  const { checkoutItems } = useCart();
  const subTotal = useMemo(() => {
    return checkoutItems.reduce(
      (total: number, value: { totalPrice: number }) =>
        total + value.totalPrice,
      0
    );
  }, [checkoutItems]);

  return (
    <div className="bg-slate-50 px-6 py-4 w-[600px] h-full">
      <h6 className="mb-2 text-lg">{`Đơn hàng (${checkoutItems.length}) sản phẩm`}</h6>
      <hr />
      <ScrollArea className="h-[260px]">
        <div className="flex flex-col gap-5 mt-6">
          {checkoutItems.map((item: any) => (
            <div className="flex gap-3 mf:gap-5 border-0" key={item?._id}>
              <div className="relative flex justify-center items-center bg-slate-100 border rounded-lg w-[120px]">
                <img src={item?.image} alt={item?.name} />
                <Badge className="-top-2 -right-2 absolute px-2 rounded-full text-[10px]">
                  {item.quantity}
                </Badge>
              </div>
              <div className="flex flex-col justify-between w-full">
                <div className="font-bold text-base">{item?.name}</div>
              </div>
              <div className="flex flex-col justify-end">
                <div className="text-md">{formatCurrencyVND(item?.price)}</div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex flex-col gap-3 mt-6 text-base">
        <div className="flex justify-between">
          <span>Tạm tính </span>
          <span className="font-bold">{formatCurrencyVND(subTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Phí vận chuyển</span>
          <span className="font-bold">0</span>
        </div>
        <div className="flex justify-between">
          <span>Tổng cộng</span>
          <span className="font-bold">{formatCurrencyVND(subTotal)}</span>
        </div>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between items-center w-full">
        <Link href="/cart" className="flex items-center">
          <ChevronLeft className="size-4" />
          Quay về giỏ hàng
        </Link>
        <Button
          onClick={form.handleSubmit(handleCheckout(checkoutItems))}
          className="mt-4"
        >
          Đặt hàng
        </Button>
      </div>
    </div>
  );
};

export default ReviewCheckout;
