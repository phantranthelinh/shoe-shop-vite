import Product from "@/components/products/product";
import { DataTableDemo } from "@/components/products/table";
import { Button } from "@/components/ui/button";
import { createLazyFileRoute } from "@tanstack/react-router";
export const Route = createLazyFileRoute("/dashboard/products/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div>Sản phẩm</div>
      Danh sách sản phẩm
      <div>
        <Product />
      </div>
      <div>
        <DataTableDemo />
      </div>
    </div>
  );
}
