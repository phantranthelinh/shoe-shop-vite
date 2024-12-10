import { createLazyFileRoute } from "@tanstack/react-router";
import MainLayout from "../components/layouts/MainLayout";
import Categories from "../components/Home/Categories";
import ProductList from "../components/Home/ProductList";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div >
      <MainLayout>
        <Categories />
        <ProductList/>
      </MainLayout>
    </div>
  );
}
