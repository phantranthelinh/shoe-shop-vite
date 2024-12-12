import Hero from "@/components/client/Hero";
import HeadingText from "@/components/client/Home/HeadingText";
import ProductList from "@/components/client/Home/ProductList";
import MainLayout from "@/components/client/layout";
import Wrapper from "@/components/common/Wrapper";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});
function HomePage() {
  return (
    <main>
      <MainLayout>
        <Hero />
        <Wrapper>
          <HeadingText />
          <ProductList />
        </Wrapper>
      </MainLayout>
    </main>
  );
}
