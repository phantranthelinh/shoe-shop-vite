import Product from "@/components/products/product";
import { DataTableDemo } from "@/components/products/table";
import { useGetProducts } from "@/hooks/api/products/useGetProducts";
import { useQueryClient } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
export const Route = createLazyFileRoute("/dashboard/products/")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = {};
  const queryClient = useQueryClient();
  const { data } = useGetProducts(params);
  const refetch = () => {
    return queryClient.invalidateQueries({
      queryKey: ["products", JSON.stringify(params)],
    });
  };
  return (
    <div>
      <div>Sản phẩm</div>
      Danh sách sản phẩm
      <div>
        <Product refetch={refetch} />
      </div>
      <div>
        {data?.products ? (
          <DataTableDemo data={data?.products} refetch={refetch} />
        ) : null}
      </div>
    </div>
  );
}
