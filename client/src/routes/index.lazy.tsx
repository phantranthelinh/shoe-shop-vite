import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/common/Wrapper";
import { createLazyFileRoute } from "@tanstack/react-router";


function generateProducts(numProducts: number) {
  const products = [];
  for (let i = 0; i < numProducts; i++) {
    const product = {
      image: `./product-1.webp`,
      id: i + 1,
      price: 10000,
      origin_price: 10000,
      slug: `/product${i + 1}`,
      name: `Product ${i + 1}`,
    };
    products.push(product);
  }
  return products;
}

const generatedProducts = generateProducts(20);

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main>
      <Hero />
      <Wrapper>
        {/* Heading and Paragraph  */}
        <section className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold">
            Cushioning for Your Miles
          </div>
          <div className="text-md md:text-xl">
            A lightweight Nike ZoomX midsole is combined with increased stack
            height to help provide cushioning during extended stretches of
            running.
          </div>
        </section>

        {/* Product Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 my-14 px-5 md:px-0">
          {generatedProducts.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </section>
      </Wrapper>
    </main>
  );
}
