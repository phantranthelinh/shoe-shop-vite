import CartItem from "@/components/client/CartItem";
import MainLayout from "@/components/client/layout";
import Wrapper from "@/components/common/Wrapper";
import { useCart } from "@/store/cart.store";
import { formatCurrencyVND } from "@/utils/format-currency";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createLazyFileRoute("/cart/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [loading, setLoading] = useState(false);
  const { cartItems } = useCart();
  const subTotal = useMemo(() => {
    return cartItems.reduce(
      (total: any, value: { totalPrice: any }) => total + value.totalPrice,
      0
    );
  }, [cartItems]);

  const handlePayment = async () => {
    setLoading(true);
  };

  return (
    <MainLayout>
      <Wrapper>
        {cartItems.length > 0 ? (
          <>
            <div className="mx-auto mt-8 md:mt-0 max-w-[800px] text-center">
              <div className="mb-5 font-semibold text-[28px] md:text-[32px] leading-tight">
                Giỏ hàng
              </div>
            </div>

            <div className="flex lg:flex-row flex-col gap-12 py-10">
              <section className="flex-[2]">
                <h2 className="font-bold text-lg">
                  Các mặt hàng trong giỏ hàng
                </h2>
                {cartItems.map((item: { id: any }) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </section>

              <section className="flex-1">
                <h2 className="font-bold text-lg">Tóm tắt</h2>
                <div className="bg-black/[0.05] my-5 p-5 rounded-xl">
                  <div className="flex justify-between">
                    <div className="font-medium text-base text-black md:text-xl uppercase">
                      Tổng cộng {formatCurrencyVND(subTotal)}
                    </div>
                    <div className="font-medium text-base text-black md:text-xl"></div>
                  </div>

                  <div className="mt-5 py-5 border-t text-sm md:text-base">
                    Đã bao gồm thuế và phí VAT
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  className="flex justify-center items-center gap-5 bg-black hover:opacity-75 mb-3 py-4 rounded-full w-full font-medium text-lg text-white transition-transform active:scale-95"
                >
                  Thanh toán
                  {loading && <img src="/spinner.svg" />}
                </button>
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
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </Wrapper>
    </MainLayout>
  );
}
