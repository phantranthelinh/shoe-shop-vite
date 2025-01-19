import CartList from "@/components/client/CartList";
import MainLayout from "@/components/client/layout";
import Wrapper from "@/components/common/Wrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { resetCheckoutItems, useCart } from "@/store/cart.store";
import { formatCurrencyVND } from "@/utils/format-currency";
import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useEffect, useMemo } from "react";

export const Route = createLazyFileRoute("/cart/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { cartItems, checkoutItems } = useCart();
  const subTotal = useMemo(() => {
    return cartItems.reduce(
      (total: number, value: { totalPrice: number }) =>
        total + value.totalPrice,
      0
    );
  }, [cartItems]);

  const navigate = useNavigate();

  useEffect(() => {
    resetCheckoutItems();
  }, []);
  return (
    <MainLayout>
      <Wrapper>
        {cartItems.length > 0 ? (
          <>
            <div className="mx-auto mt-8 md:mt-0">
              <div className="mb-5 font-semibold text-[28px] md:text-[32px] leading-tight">
                Giỏ hàng của bạn
              </div>
            </div>

            <div className="flex flex-col gap-12 py-10">
              <section className="flex-[2]">
                <CartList cartItems={cartItems} />
              </section>
              <section className="flex-1">
                <div className="flex justify-between">
                  <Link
                    to="/"
                    className={buttonVariants({
                      variant: "secondary",
                    })}
                  >
                    <ChevronLeft />
                    Tiếp tục mua hàng
                  </Link>
                  <div className="rounded-xl">
                    <table className="border-collapse border-gray-300 mb-4 border w-full">
                      <tbody>
                        <tr>
                          <td className="border-gray-300 p-2 border text-base text-black md:text-lg">
                            Tạm tính
                          </td>
                          <td className="border-gray-300 p-2 border text-base text-black md:text-lg">
                            {formatCurrencyVND(subTotal)}
                          </td>
                        </tr>
                        <tr>
                          <td className="border-gray-300 p-2 border text-base text-black md:text-lg">
                            Tổng tiền thanh toán
                          </td>
                          <td className="border-gray-300 p-2 border text-base text-black md:text-lg">
                            {formatCurrencyVND(subTotal)}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <Button
                      onClick={() => navigate({ to: "/checkout" })}
                      disabled={checkoutItems.length === 0}
                      className="flex justify-center items-center gap-5 bg-black hover:opacity-75 mb-3 py-4 w-full font-medium text-lg text-white transition-transform active:scale-95"
                    >
                      Tiến hàng thanh toán
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col flex-[2] items-center md:-mt-14 pb-[50px]">
              <img
                src="/empty-cart.jpg"
                alt="Empty Cart"
                width={300}
                height={300}
                className="w-[300px] md:w-[400px]"
              />

              <span className="font-bold text-xl">
                Giỏ hàng của bạn đang trống
              </span>
              <span className="mt-4 text-center">
                Có vẻ như bạn chưa thêm bất kỳ sản phẩm nào vào giỏ hàng.
                <br />
                Hãy khám phá các danh mục hàng đầu ngay bây giờ.
              </span>

              <Link
                className="bg-black hover:opacity-75 mt-8 mb-3 px-8 py-4 rounded-full font-medium text-lg text-white transition-transform active:scale-95"
                href="/"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          </>
        )}
      </Wrapper>
    </MainLayout>
  );
}
