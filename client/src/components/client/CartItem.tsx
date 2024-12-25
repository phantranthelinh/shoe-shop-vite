import { updateCart } from "@/store/cart.store";
import { formatCurrencyVND } from "@/utils/format-currency";
import { Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";

const CartItem = ({ data }: { data: any }) => {
  const updateCartItem = (e: any, key: any) => {
    let payload = {
      key,
      val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
      id: data.id,
    };
    updateCart(payload.id, payload.key, payload.val);
  };

  return (
    <div className="flex gap-3 mf:gap-5 border-0 py-5 border-b last:border-b-0">
      <Link
        href={`/product/${data?.slug}`}
        className="w-[50px] md:w-[120px] aspect-square shrink-0"
      >
        <img src={data?.image} alt={data?.name} width={120} height={120} />
      </Link>

      <div className="flex flex-col w-full">
        <div className="flex md:flex-row flex-col justify-between">
          <h2 className="font-semibold text-black/[.8] text-lg md:text-2xl">
            {data?.name}
          </h2>

          <h3 className="mt-2 font-bold text-black/[.5] text-sm md:text-md">
            {formatCurrencyVND(data?.price)}
          </h3>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-gray-600 text-sm md:text-md">
            <label htmlFor="quantity" className="font-semibold">
              Số lượng:
            </label>
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                variant="outline"
                onClick={() =>
                  updateCartItem(
                    { target: { value: data.quantity - 1 } },
                    "quantity"
                  )
                }
                disabled={data.quantity <= 1}
              >
                <Minus />
              </Button>
              <span className="font-medium text-lg">{data.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  updateCartItem(
                    { target: { value: data.quantity + 1 } },
                    "quantity"
                  )
                }
              >
                <Plus />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
