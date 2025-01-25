import Layout from "@/components/dashboard/layout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/customers/")({
  component: CustomerPage,
});

function CustomerPage() {
  // const { isLoading, data } = useGetOrders({ isAdmin: true });
  return (
    <Layout>
      <div className="flex justify-between items-center">
        <div className="text-2xl">Quản lý khách hàng</div>
      </div>
      {/* {isLoading ? <Loading /> : <OrderTable data={data} />} */}
    </Layout>
  );
}
