import { deleteFromCart, updateCart } from "@/store/cart.store";
import { formatCurrencyVND } from "@/utils/format-currency";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "../ui/button";

const CartItem = ({ data }: { data: any }) => {
  const updateCartItem = (e: any, key: any) => {
    let payload = {
      key,
      val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
      id: data._id,
    };
    updateCart(payload.id, payload.key, payload.val);
  };

  return (
    <div className="flex gap-3 mf:gap-5 border-0 py-5 border-b last:border-b-0">
      <Link
        href={`/products/${data?.slug}`}
        className="flex border-2 w-[50px] md:w-[160px] h-[160px] aspect-square"
      >
        <img
          src={data?.image}
          alt={data?.name}
          className="w-full object-covers"
        />
      </Link>
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center">
          <div className="flex md:flex-row flex-col justify-between">
            <h2 className="font-semibold text-black/[.8] text-lg md:text-2xl">
              {data?.name}
            </h2>
          </div>
          <Button
            size="icon"
            variant="outline"
            onClick={() => deleteFromCart(data?._id)}
          >
            <X size={6} />
          </Button>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 md:gap-6 text-gray-600 text-sm md:text-md">
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
        <div className="flex justify-end">
          <h3 className="mt-2 font-bold text-md">
            {formatCurrencyVND(data?.price)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
