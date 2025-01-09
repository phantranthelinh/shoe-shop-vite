import Wrapper from "@/components/common/Wrapper";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/payment-success/")({
  component: PaymentSuccessPage,
});

function PaymentSuccessPage() {
  return (
    <main className="flex items-center min-h-[650px]">
      <Wrapper>
        <section className="flex flex-col mx-auto p-5 border border-black rounded-lg max-w-[600px]">
          <h1 className="font-bold text-2xl">
            Thank you for shopping with us!
          </h1>

          <div className="mt-2 font-bold text-lg">
            Đơn hàng của bạn đã được đặt thành công.
          </div>

          <div className="mt-5 text-base">
            Đối với bất kỳ câu hỏi liên quan đến sản phẩm, vui lòng gửi email
            đến
          </div>

          <Link href="mailto:aslinikecontact@nike.com">
            <div className="underline hover:cursor-pointer">
              aslinikecontact@nike.com
            </div>
          </Link>

          <Link href="/" className="mt-5 font-bold cursor-pointer">
            Tiếp tục mua sắm
          </Link>
        </section>
      </Wrapper>
    </main>
  );
}
