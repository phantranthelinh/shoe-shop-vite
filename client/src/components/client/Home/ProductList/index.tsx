import { useGetProducts } from "@/hooks/api/products/useGetProducts";
import ProductCard from "../../ProductCard";
import { Product } from "@/entities/product";
import { Loading } from "../../../common/Loading";

const ProductList = () => {
  const { isLoading, data } = useGetProducts();
  return (
    <section className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-14 px-5 md:px-0">
      <>
        {isLoading ? (
          <Loading />
        ) : (
          data?.products.map((product: Product) => (
            <ProductCard key={product._id} data={product} />
          ))
        )}
      </>
    </section>
  );
};

export default ProductList;
