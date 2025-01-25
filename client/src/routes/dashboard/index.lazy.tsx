import { Loading } from "@/components/common/Loading";
import Layout from "@/components/dashboard/layout";
import { Card } from "@/components/ui/card";
import { useGetOverviews } from "@/hooks/api/overview/useGetOverview";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { PackageSearch, ShoppingBasket, UserRound } from "lucide-react";

export const Route = createLazyFileRoute("/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  const { isLoading, data } = useGetOverviews();

  return (
    <Layout>
      <h2 className="text-3xl">Tổng quan</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="gap-2 grid grid-cols-2 mt-4">
          <Card className="p-4">
            <Link to="/dashboard/orders" className="flex gap-2">
              <ShoppingBasket className="size-5" />
              <div>Số đơn hàng : {data?.totalOrders}</div>
            </Link>
          </Card>
          <Card className="p-4">
            <Link className="flex gap-2" to="/dashboard/products">
              <PackageSearch className="size-5" />
              <div>Số sản phẩm hiện có : {data?.totalProducts}</div>
            </Link>
          </Card>
          <Card className="p-4">
            <Link className="flex gap-2" to="/dashboard/customers">
              <UserRound className="size-5" />
              <div>User đang sử dụng : {data?.totalUsers}</div>
            </Link>
          </Card>
        </div>
      )}
    </Layout>
  );
}
