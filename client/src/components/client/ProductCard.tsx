import { IMAGE_PLACEHOLDER } from "@/constants";
import { Product } from "@/entities/product";
import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Card } from "../ui/card";
import { useWishlist } from "@/store/wishlist.store";

const ProductCard = ({ data }: { data: Product }) => {
  const imageUrl = data.image || IMAGE_PLACEHOLDER;

  const { addToWishlist } = useWishlist();

  return (
    <Card className="flex flex-col p-4 border w-full min-h-[300px] transform duration-200 cursor-pointer">
      <div className="relative flex justify-center bg-gray-100 rounded-lg">
        <div
          onClick={() => addToWishlist(data)}
          className="top-2 right-2 z-10 absolute flex justify-center items-center hover:bg-black/[0.05] p-1 border rounded-full cursor-pointer size-8"
        >
          <Heart className="size-5" />
        </div>
        <Link
          className="bg-gray-100 rounded-lg w-full transform duration-200 cursor-pointer"
          href={`/products/${data.slug}`}
        >
          <img
            className="rounded-lg w-full h-[210px] object-contain"
            alt={data.name}
            src={imageUrl}
          />
        </Link>
      </div>
      <section className="p-2 text-black/[.9]">
        <Link href={`/products/${data.slug}`}>
          <h2 className="line-clamp-1 font-medium text-lg">{data.name}</h2>
        </Link>
        <div className="flex justify-between">
          <p className="mr-2 font-semibold text-lg">{data.price} VNĐ</p>
          {/* {data.original_price && (
              <>
                <p className="font-medium text-base line-through">
                  {data.original_price} VNĐ
                </p>
                <p className="ml-auto font-medium text-base text-green-500">
                  {getDiscount(data.original_price, data.price)}% off
                </p>
              </>
            )} */}
        </div>
      </section>
    </Card>
  );
};

export default ProductCard;
