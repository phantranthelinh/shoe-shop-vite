import { Carousel } from "../ui/carousel";
import ProductCard from "./ProductCard";

type Product = {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
};

type RelatedProductsProps = {
  relatedProducts: {
    data: Product[];
  };
};

const RelatedProducts = ({ relatedProducts }: RelatedProductsProps) => {
  return (
    <section className="mdLmt-[100px] mt-[50px] mb-[100px] md:mb-0">
      <h1 className="mb-5 font-bold text-2xl">Có thể bạn thích</h1>
      <Carousel>
        {relatedProducts?.data?.map((prod) => (
          <ProductCard key={prod.id} data={prod} />
        ))}
      </Carousel>
    </section>
  );
};

export default RelatedProducts;
