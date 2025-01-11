/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "@/entities/product";
import { useCart } from "@/store/cart.store";
import { useWishlist } from "@/store/wishlist.store";
import { Link } from "@tanstack/react-router";
import { HeartOff } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const WishlistItem = ({ data }: { data: Product }) => {
  const { deleteFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  return (
    <Card className="flex flex-col p-4 border w-full min-h-[300px] transform duration-200 cursor-pointer">
      <div className="relative flex justify-center bg-gray-100 rounded-lg">
        <div
          onClick={() => deleteFromWishlist(data._id as string)}
          className="top-2 right-2 z-10 absolute flex justify-center items-center hover:bg-black/[0.05] p-1 border rounded-full cursor-pointer size-8"
        >
          <HeartOff className="size-5" />
        </div>
        <Link
          className="bg-gray-100 rounded-lg w-full transform duration-200 cursor-pointer"
          href={`/products/${data.slug}`}
        >
          <img
            className="rounded-lg w-full h-[210px] object-contain"
            alt={data.name}
            src={data.image}
          />
        </Link>
      </div>
      <section className="p-2 text-black/[.9]">
        <Link href={`/products/${data.slug}`}>
          <h2 className="line-clamp-1 font-medium text-lg">{data.name}</h2>
        </Link>
        <div className="flex justify-between">
          <p className="mr-2 font-semibold text-lg">{data.price} VNĐ</p>
        </div>
      </section>
      <Button onClick={() => addToCart(data as any)}>Thêm vào giỏ hàng</Button>
    </Card>
  );
};

export default WishlistItem;
