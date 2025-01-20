import MainLayout from "@/components/client/layout";
import OrderList from "@/components/client/OrderList";
import { Loading } from "@/components/common/Loading";
import Wrapper from "@/components/common/Wrapper";
import { useGetOrders } from "@/hooks/api/orders/useGetOrders";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/orders/")({
  component: OrderPage,
});

function OrderPage() {
  const { data, isLoading } = useGetOrders({ isAdmin: false });

  return (
    <MainLayout classNames="justify-start mt-10 min-h-[60vh]">
      <Wrapper className="max-w-screen-lg">
        <div className="font-bold text-xl">Đơn hàng của bạn</div>
        {isLoading ? (
          <Loading />
        ) : data?.length > 0 ? (
          <OrderList data={data} />
        ) : (
          <p>Bạn chưa đặt hàng</p>
        )}
      </Wrapper>
    </MainLayout>
  );
}
