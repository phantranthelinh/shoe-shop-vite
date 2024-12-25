import { Product } from "@/entities/product";

const ProductDetailsCarousel = ({ product }: { product: Product }) => {
  return (
    <div className="top-[50px] sticky mx-auto w-full max-w-[1360px] text-[20px] text-white">
      <img src={product?.image} alt={product?.name} />
    </div>
  );
};

export default ProductDetailsCarousel;
