import { Product } from "@/entities/product";
import ProductCard from "../../ProductCard";

const ProductList = ({ data }: { data?: Product[] }) => {
  return (
    <section className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-14 px-5 md:px-0">
      <>
        {data?.map((product: Product) => (
          <ProductCard key={product._id} data={product} />
        ))}
      </>
    </section>
  );
};

export default ProductList;
