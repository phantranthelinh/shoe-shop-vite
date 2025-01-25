import MainLayout from "@/components/client/layout";
import ProductDetailsCarousel from "@/components/client/ProductDetailsCarousel";
import RelatedProducts from "@/components/client/RelatedProducts";
import Review from "@/components/client/Review";
import { Loading } from "@/components/common/Loading";
import Wrapper from "@/components/common/Wrapper";

import { useGetProductBySlug } from "@/hooks/api/products/useGetProductBySlug";
import { useGetRelatedProducts } from "@/hooks/api/products/useGetRelatedProducts";
import { addToCart } from "@/store/cart.store";
import { formatCurrencyVND } from "@/utils/format-currency";
import { parseHtml } from "@/utils/parse-html";
import { createLazyFileRoute } from "@tanstack/react-router";
export const Route = createLazyFileRoute("/products/$productName/")({
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { productName } = Route.useParams();
  const { isLoading, data: product } = useGetProductBySlug(productName);
  const { data: relatedProducts } = useGetRelatedProducts(productName);
  const handleAddingToCart = () => {
    addToCart(product);
  };

  return (
    <main className="w-full">
      <MainLayout>
        <Wrapper className="p-10 min-h-[calc(100vh-100px)]">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <section className="flex lg:flex-row flex-col gap-[50px] lg:gap-[100px] md:px-10">
                <div className="flex-[1.5] lg-mx-0 mx-auto w-full md:w-auto max-w-[500px] lg:max-w-full">
                  <ProductDetailsCarousel product={product} />
                  <Review />
                </div>

                <div className="flex-1 py-3">
                  <h1 className="mb-2 font-semibold text-[34px] leading-tight">
                    {product?.name}
                  </h1>

                  <div className="flex items-center">
                    <p className="mr-2 font-semibold text-lg">
                      {formatCurrencyVND(product?.price)}
                    </p>
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
                    Thêm vào giỏ hàng
                  </button>

                  <div>
                    <div className="mb-5 font-bold text-lg">
                      Chi tiết sản phẩm
                    </div>
                    <div className="mb-5 text-md markdown">
                      <div>{parseHtml(product?.description)}</div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {relatedProducts?.length > 0 && (
            <RelatedProducts relatedProducts={relatedProducts} />
          )}
        </Wrapper>
      </MainLayout>
    </main>
  );
}
