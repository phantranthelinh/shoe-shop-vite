import ProductDetailsCarousel from "@/components/client/ProductDetailsCarousel";
import Wrapper from "@/components/common/Wrapper";

import { useGetProduct } from "@/hooks/api/products/useGetProduct";
import { addToCart } from "@/store/cart.store";
import {
  useWishlist
} from "@/store/wishlist.store";
import { getDiscount } from "@/utils/helper";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/products/$productName/")({
  component: DetailProductPage,
});

function DetailProductPage() {
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);


  const { productName } = Route.useParams()
  const { data: product } = useGetProduct(productName);
  const { wishlistItems } = useWishlist();

  const handleAddingToCart = () => {
    if (!selectedSize) {
      setShowError(true);
    } else {
      addToCart({
        ...product,
        selectedSize,
      });
      setSelectedSize(undefined);
    }
  };


  console.log(product)
 
  return (
    <main className="w-full md:py-20">
      <Wrapper>
        <section className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg-mx-0">
            <ProductDetailsCarousel images={product?.image} />
          </div>
          <div className="flex-1 py-3">
            <h1 className="text-[34px] font-semibold mb-2 leading-tight">
              {product?.name}
            </h1>

            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">
                {product?.price} VNĐ
              </p>
              {product?.original_price && (
                <>
                  <p className="text-base font-semibold line-through">
                    &#8377; {product?.original_price}
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {getDiscount(product?.original_price, product?.price)}% off
                  </p>
                </>
              )}
            </div>

            <p className="text-md font-medium text-black/[.5]">
             Đã bao gồm thuế
            </p>
            <p className="text-md font-medium text-black/[.5] mb-20">
              &#40;Cũng bao gồm tất cả các nhiệm vụ áp dụng được&#41;
            </p>

            <div className="mb-10">
              <div className="flex justify-between mb-2 ">
                <div className="text-md font-semibold">Select Size</div>
                <div className="text-md font-medium text-black/[.5] cursor-pointer">
                  Select Guide
                </div>
              </div>

              {/* <div className="grid grid-cols-3 gap-2" id="sizesGrid">
                {product.size.data.map((item, index) => (
                  <div
                    key={index}
                    className={`border rounded-md text-center py-3 font-medium  ${
                      item.enabled
                        ? "cursor-pointer hover:border-black"
                        : "cursor-not-allowed bg-black/[.1] opacity-50"
                    }
                ${selectedSize === item.size ? "border-black" : ""}`}
                    onClick={() => {
                      if (item.enabled) {
                        setSelectedSize(item.size);
                        setShowError(false);
                      }
                    }}
                  >
                    {item.size}
                  </div>
                ))}
              </div> */}

              {showError && (
                <div className="text-red-600 mt-1">
                  Size selection is required
                </div>
              )}
            </div>

            <button
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              onClick={handleAddingToCart}
            >
              Add to Cart
            </button>

            {/* {wishlistItems.find(
              (item) => item.id === productData?.data?.[0]?.id
            ) ? (
              <button
                onClick={() => {
                  deleteFromWishlist(productData?.data?.[0]?.id);
                }}
                className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 mb-10 hover:opacity-75 "
              >
                Wishlist
                <IoMdHeart className="text-red-600" size={20} />
              </button>
            ) : (
              <button
                onClick={() => {
                  addToWishlist({
                    ...productData?.data?.[0],
                  });
                }}
                className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 mb-10 hover:opacity-75 "
              >
                Wishlist
                <IoMdHeartEmpty size={20} />
              </button>
            )} */}

            <div>
              <div className="text-lg font-bold mb-5">Product Details</div>
              <div className="markdown text-md mb-5">
                <div>{product.description}</div>
              </div>
            </div>
          </div>
        </section>

        {/* <RelatedProducts relatedProducts={relatedProducts} /> */}
      </Wrapper>
    </main>
  );
}
