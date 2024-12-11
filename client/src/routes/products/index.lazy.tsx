import { createLazyFileRoute } from "@tanstack/react-router";
import MainLayout from "../../components/layouts/MainLayout";
import ProductItem from "../../components/Product/ProductItem";

export const Route = createLazyFileRoute("/products/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <div className="py-4 max-w-screen-xl">
        <h2 className="text-3xl text-left py-4">All Products</h2>
        <div className="grid grid-cols-4 gap-6">
          {Array.from({ length: 10 }).map((_, index) => {
            return <ProductItem id={index} key={index} />;
          })}
        </div>
      </div>
    </MainLayout>
  );
}
