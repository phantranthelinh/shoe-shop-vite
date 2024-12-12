import Layout from "@/components/dashboard/layout";
import Product from "@/components/dashboard/products/product";
import { DataTableDemo } from "@/components/dashboard/products/table";
import { useGetProducts } from "@/hooks/api/products/useGetProducts";
import { createLazyFileRoute } from "@tanstack/react-router";
export const Route = createLazyFileRoute("/dashboard/products/")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = {};
  const { data } = useGetProducts(params);

  return (
    <Layout>
      <div>Sản phẩm</div>
      Danh sách sản phẩm
      <div>
        <Product />
      </div>
      <div>
        {data?.products ? <DataTableDemo data={data?.products} /> : null}
      </div>
    </Layout>
  );
}
