import { IMAGE_PLACEHODER } from "@/constants";
import { getDiscount } from "@/utils/helper";
import { Link } from "@tanstack/react-router";

const ProductCard = ({ data }: { data: any }) => {
  const imageUrl = data.image || IMAGE_PLACEHODER;
  return (
    <Link
      className="bg-white transform duration-200 cursor-pointer"
      href={`/products/${data.slug}`}
    >
      <div className="flex flex-col border border-black">
        <div className="flex justify-between p-2 border-b border-black">
          <span>{data.category.name}</span>
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
        <div className="flex justify-center w-full">
          <img
            className="w-full h-[210px] object-contain"
            alt={data.name}
            src={imageUrl}
          />
        </div>
        <section className="p-2 border-t border-black text-black/[.9]">
          <h2 className="font-medium text-lg">{data.name}</h2>
          <div className="flex items-center text-black/[.5]"></div>
        </section>
      </div>
    </Link>
  );
};

export default ProductCard;
