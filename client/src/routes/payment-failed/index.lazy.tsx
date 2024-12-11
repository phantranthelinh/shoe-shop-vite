import Wrapper from "@/components/common/Wrapper";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/payment-failed/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="min-h-[650px] flex items-center">
      <Wrapper>
        <section className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
          <h1 className="text-2xl font-bold">Thanh Toán Thất Bại!</h1>
          <div className="text-base mt-5">
            Đối với bất kỳ câu hỏi liên quan đến sản phẩm, vui lòng gửi email
            đến
          </div>
          <Link href="mailto:aslinikecontact@nike.com">
            <div className="underline hover:cursor-pointer">
              aslinikecontact@nike.com
            </div>
          </Link>

          <Link href="/" className="font-bold mt-5 cursor-pointer">
            Tiếp tục mua sắm
          </Link>
        </section>
      </Wrapper>
    </main>
  );
}
