import { IMAGE_PLACEHODER } from "@/constants";
import { getDiscount } from "@/utils/helper";
import { Link } from "@tanstack/react-router";

const ProductCard = ({ data }: { data: any }) => {
  const imageUrl = data.image || IMAGE_PLACEHODER;
  return (
    <Link
      className="bg-white transform duration-200 cursor-pointer overflow-hidden hover:scale-105"
      href={`/products/${data.slug}`}
    >
      <img width={500} height={500} alt={data.name} src={imageUrl} />
      <section className="p-4 text-black/[.9]">
        <h2 className="font-medium text-lg">{data.name}</h2>
        <div className="flex items-center text-black/[.5]">
          <p className="mr-2 font-semibold text-lg">{data.price} VNĐ</p>
          {data.original_price && (
            <>
              <p className="font-medium text-base line-through">
                {data.original_price} VNĐ
              </p>
              <p className="ml-auto font-medium text-base text-green-500">
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
