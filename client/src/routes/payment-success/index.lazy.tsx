import MainLayout from "@/components/client/layout";
import Wrapper from "@/components/common/Wrapper";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { MoveRight } from "lucide-react";

export const Route = createLazyFileRoute("/payment-success/")({
  component: PaymentSuccessPage,
});

function PaymentSuccessPage() {
  return (
    <MainLayout classNames="min-h-[60vh]">
      <Wrapper>
        <section className="flex flex-col mx-auto p-5 border border-black rounded-lg max-w-[600px]">
          <h1 className="font-bold text-2xl">
            Cảm ơn bạn đã mua sắm ở shop chúng mình!
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
          <div className="flex justify-between items-center mt-5">
            <Link to="/orders" className="font-bold underline cursor-pointer">
              Xem đơn hàng của bạn
            </Link>
            <Link
              to="/"
              className="flex gap-2 font-bold underline cursor-pointer"
            >
              Tiếp tục mua sắm
              <MoveRight />
            </Link>
          </div>
        </section>
      </Wrapper>
    </MainLayout>
  );
}
