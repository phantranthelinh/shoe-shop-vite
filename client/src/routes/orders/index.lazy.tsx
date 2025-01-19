import MainLayout from "@/components/client/layout";
import Wrapper from "@/components/common/Wrapper";
import { useGetOrdersByUser } from "@/hooks/api/orders/useGetUserOrder";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/orders/")({
  component: OrderPage,
});

function OrderPage() {
  const { data } = useGetOrdersByUser();

  console.log(data);

  return (
    <MainLayout>
      <Wrapper>
        <div>Đơn hàng của bạn</div>
      </Wrapper>
    </MainLayout>
  );
}
