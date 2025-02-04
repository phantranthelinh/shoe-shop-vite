import { Loading } from "@/components/common/Loading";
import Layout from "@/components/dashboard/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetOverviews } from "@/hooks/api/overview/useGetOverview";
import { formatCurrencyVND } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import {
  DollarSign,
  PackageSearch,
  ShoppingBasket,
  UserRound,
} from "lucide-react";

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
        <div className="mt-4">
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-4">
            <Card className="relative px-4 py-8 overflow-hidden">
              <div className="-top-10 -left-10 z-0 absolute bg-black/[0.3] rounded-full w-[160px] h-[160px]"></div>
              <Link to="/dashboard/revenue" className="z-10 flex gap-2">
                <DollarSign className="size-8" />
                <div className="z-10 ml-auto">
                  Thu nhập trong tháng : {data?.totalOrders}
                </div>
              </Link>
            </Card>
            <Card className="relative px-4 py-8 overflow-hidden">
              <div className="-top-10 -left-10 z-0 absolute bg-black/[0.3] rounded-full w-[160px] h-[160px]"></div>
              <Link to="/dashboard/orders" className="z-10 flex gap-2">
                <ShoppingBasket className="size-8" />
                <div className="z-10 ml-auto">
                  Đơn hàng mới : {data?.totalOrders}
                </div>
              </Link>
            </Card>
            <Card className="relative px-4 py-8 overflow-hidden">
              <div className="-top-10 -left-10 z-0 absolute bg-black/[0.3] rounded-full w-[160px] h-[160px]"></div>
              <Link to="/dashboard/customers" className="z-10 flex gap-2">
                <UserRound className="size-8" />
                <div className="z-10 ml-auto">
                  Khách hàng mới : {data?.totalUsers}
                </div>
              </Link>
            </Card>
            <Card className="relative px-4 py-8 overflow-hidden">
              <div className="-top-10 -left-10 z-0 absolute bg-black/[0.3] rounded-full w-[160px] h-[160px]"></div>
              <Link to="/dashboard/products" className="z-10 flex gap-2">
                <PackageSearch className="size-8" />
                <div className="z-10 ml-auto">
                  Sản phẩm hiện có : {data?.totalProducts}
                </div>
              </Link>
            </Card>
          </div>
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 mt-4">
            <Card className="py-4">
              <h6 className="mb-4 ml-2 text-2xl">Đơn hàng chờ xử lý</h6>
              <ScrollArea className="h-[400px]">
                <div className="flex flex-col gap-4">
                  {Array.from({ length: 20 }).map((_, index) => {
                    return (
                      <div
                        key={index}
                        className="flex gap-4 hover:bg-gray-100 px-2 hover:cursor-pointer"
                      >
                        <Avatar>
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                          <div>{formatDate("2023-01-01")}</div>
                          <p>Nguyen Van A, one item</p>
                        </div>
                        <div className="ml-auto">
                          {formatCurrencyVND(100000)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </Card>
          </div>
        </div>
      )}
    </Layout>
  );
}
