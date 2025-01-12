/* eslint-disable @typescript-eslint/no-explicit-any */
import MainLayout from "@/components/client/layout";
import ProductDetailsCarousel from "@/components/client/ProductDetailsCarousel";
import RelatedProducts from "@/components/client/RelatedProducts";
import Message from "@/components/common/Error/Message";
import { Loading } from "@/components/common/Loading";
import Rating from "@/components/common/Rating";
import Wrapper from "@/components/common/Wrapper";

import { useGetProductBySlug } from "@/hooks/api/products/useGetProductBySlug";
import { useGetRelatedProducts } from "@/hooks/api/products/useGetRelatedProducts";
import { addToCart } from "@/store/cart.store";
import { formatCurrencyVND } from "@/utils/format-currency";
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

  console.log(relatedProducts);
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
                  <div>
                    <div className="my-5 row">
                      <div className="col-md-6">
                        <h6 className="mb-3">BÌNH LUẬN</h6>
                        {product?.reviews?.length === 0 && (
                          <Message variant={"alert-info mt-3"}>
                            Không có đánh giá
                          </Message>
                        )}
                        {product?.reviews?.map((review: any) => {
                          return (
                            <div
                              key={review._id}
                              className="bg-light shadow-sm mb-5 mb-md-3 p-3 rounded"
                            >
                              <strong>{review.name}</strong>
                              <Rating value={review.rating} />
                              {/* <span>{moment(review.createdAt).calendar()}</span> */}
                              <div className="mt-3 alert alert-info">
                                {review.comment}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {/* <div className="col-md-6">
                        <h5>THÊM ĐÁNH GIÁ</h5>
                        <div className="my-4"></div>

                        {isAuthenticated ? (
                          <form onSubmit={submitHandler}>
                            <div className="my-4">
                              <strong>Đánh giá</strong>
                              <select
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className="border-0 bg-light mt-2 p-3 rounded col-12"
                              >
                                <option value="">Select...</option>
                                <option value="1">1 - Rất tệ</option>
                                <option value="2">2 - Tệ</option>
                                <option value="3">3 - Bình thường</option>
                                <option value="4">4 - Tốt</option>
                                <option value="5">5 - Rất tốt</option>
                              </select>
                            </div>
                            <div className="my-4">
                              <strong>Bình luận</strong>
                              <textarea
                                row="3"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="border-0 bg-light mt-2 p-3 rounded col-12"
                              ></textarea>
                            </div>
                            <div className="my-3">
                              <button
                                disabled={loadingCreateReview}
                                className="border-0 bg-black p-3 rounded text-white col-12"
                              >
                                Đăng
                              </button>
                            </div>
                          </form>
                        ) : (
                          <div className="my-3">
                            <Message variant={"alert-warning"}>
                              Vui lòng{" "}
                              <Link to="/login">
                                " <strong>Đăng nhập</strong> "
                              </Link>{" "}
                              để thêm đánh giá{" "}
                            </Message>
                          </div>
                        )}
                      </div> */}
                    </div>
                  </div>
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
                      <div>{product?.description}</div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {relatedProducts.length > 0 && (
            <RelatedProducts relatedProducts={relatedProducts} />
          )}
        </Wrapper>
      </MainLayout>
    </main>
  );
}
