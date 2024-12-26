import ProductList from "@/components/client/Home/ProductList";
import MainLayout from "@/components/client/layout";
import { Loading } from "@/components/common/Loading";
import { useGetProductByCategory } from "@/hooks/api/products/useGetProductByCategory";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/category/$categoryName")({
  component: CategoryPage,
});

function CategoryPage() {
  const { categoryName } = Route.useParams();
  const { data, isLoading } = useGetProductByCategory(categoryName);
  return (
    <MainLayout>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h6>{data?.data?.name}</h6>
          <ProductList data={data?.data?.products} />
        </>
      )}
    </MainLayout>
  );
}
