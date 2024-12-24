import { IMAGE_PLACEHODER } from "@/constants";
import { getDiscount } from "@/utils/helper";
import { Link } from "@tanstack/react-router";

const ProductCard = ({ data }: { data: any }) => {
  const imageUrl = data.image || IMAGE_PLACEHODER;
  return (
    <Link
      className="transform overflow-hidden bg-white hover:scale-105 cursor-pointer duration-200"
      href={`/products/${data.slug}`}
    >
      <img width={500} height={500} alt={data.name} src={imageUrl} />
      <section className="p-4 text-black/[.9]">
        <h2 className="text-lg font-medium">{data.name}</h2>
        <div className="flex items-center text-black/[.5]">
          <p className="mr-2 text-lg font-semibold">{data.price} VNĐ</p>
          {data.original_price && (
            <>
              <p className="text-base font-medium line-through">
                {data.original_price} VNĐ
              </p>
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscount(data.original_price, data.price)}% off
              </p>
            </>
          )}
        </div>
      </section>
    </Link>
  );
};

export default ProductCard;
