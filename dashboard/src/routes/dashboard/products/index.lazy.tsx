import Product from "@/components/products/product";
import { DataTableDemo } from "@/components/products/table";
import { useGetProducts } from "@/hooks/api/products/useGetProducts";
import Layout from "@/layout/Layout";
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
