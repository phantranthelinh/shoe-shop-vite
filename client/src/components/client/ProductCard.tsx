import { IMAGE_PLACEHOLDER } from "@/constants";
import { getDiscount } from "@/utils/helper";
import { Link } from "@tanstack/react-router";
import { Card } from "../ui/card";

const ProductCard = ({ data }: { data: any }) => {
  const imageUrl = data.image || IMAGE_PLACEHOLDER;
  return (
    <Card className="flex flex-col p-4 border min-h-[360px]">
      <Link
        className="bg-white transform duration-200 cursor-pointer"
        href={`/products/${data.slug}`}
      >
        <div className="flex justify-center rounded-lg">
          <img
            className="rounded-lg w-full h-[210px] object-contain"
            alt={data.name}
            src={imageUrl}
          />
        </div>
        <section className="p-2 text-black/[.9]">
          <h2 className="font-medium text-lg">{data.name}</h2>
          <div className="flex justify-between">
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
    </Card>
  );
};

export default ProductCard;
