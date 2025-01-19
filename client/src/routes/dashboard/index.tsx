import Layout from "@/components/dashboard/layout";
import { Card } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBasket } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <Layout>
      <h2 className="text-3xl">Tổng quan</h2>
      <div className="gap-2 grid grid-cols-2 mt-4">
        <Card className="p-4">
          <div className="flex gap-2">
            <ShoppingBasket className="size-5" />
            <div>Tổng đơn hàng : 4</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex gap-2">
            <ShoppingBasket className="size-5" />
            <div>Tổng sản phẩm : 4</div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
