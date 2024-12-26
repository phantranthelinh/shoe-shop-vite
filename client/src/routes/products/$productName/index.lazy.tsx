import Hero from "@/components/client/Hero";
import MainLayout from "@/components/client/layout";
import ProductDetailsCarousel from "@/components/client/ProductDetailsCarousel";
import RelatedProducts from "@/components/client/RelatedProducts";
import { Loading } from "@/components/common/Loading";
import Wrapper from "@/components/common/Wrapper";

import { useGetProduct } from "@/hooks/api/products/useGetProduct";
import { useGetRelatedProducts } from "@/hooks/api/products/useGetRelatedProducts";
import { addToCart } from "@/store/cart.store";
import { getDiscount } from "@/utils/helper";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/products/$productName/")({
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { productName } = Route.useParams();
  const { isLoading, data: product } = useGetProduct(productName);
  const { data: relatedProducts } = useGetRelatedProducts(productName);

  const handleAddingToCart = () => {
    addToCart({
      ...product,
    });
  };

  return (
    <main className="w-full">
      <MainLayout>
        <Wrapper>
          <section className="flex lg:flex-row flex-col gap-[50px] lg:gap-[100px] md:px-10">
            <div className="flex-[1.5] lg-mx-0 mx-auto w-full md:w-auto max-w-[500px] lg:max-w-full">
              <ProductDetailsCarousel product={product} />
            </div>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <div className="flex-1 py-3">
                  <h1 className="mb-2 font-semibold text-[34px] leading-tight">
                    {product?.name}
                  </h1>

                  <div className="flex items-center">
                    <p className="mr-2 font-semibold text-lg">
                      {product?.price} VNĐ
                    </p>
                    {product?.original_price && (
                      <>
                        <p className="font-semibold text-base line-through">
                          &#8377; {product?.original_price}
                        </p>
                        <p className="ml-auto font-medium text-base text-green-500">
                          {getDiscount(product?.original_price, product?.price)}
                          % off
                        </p>
                      </>
                    )}
                  </div>

                  <p className="font-medium text-black/[.5] text-md">
                    Đã bao gồm thuế
                  </p>
                  <p className="mb-20 font-medium text-black/[.5] text-md">
                    &#40;Cũng bao gồm tất cả các nhiệm vụ áp dụng được&#41;
                  </p>

                  <button
                    className="bg-black hover:opacity-75 mb-3 py-4 rounded-full w-full font-medium text-lg text-white transition-transform active:scale-95"
                    onClick={handleAddingToCart}
                  >
                    Add to Cart
                  </button>

                  <div>
                    <div className="mb-5 font-bold text-lg">
                      Product Details
                    </div>
                    <div className="mb-5 text-md markdown">
                      <div>{product?.description}</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>

          <RelatedProducts relatedProducts={relatedProducts} />
        </Wrapper>
      </MainLayout>
    </main>
  );
}
