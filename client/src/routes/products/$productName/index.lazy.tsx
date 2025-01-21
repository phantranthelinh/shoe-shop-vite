/* eslint-disable @typescript-eslint/no-explicit-any */
import MainLayout from "@/components/client/layout";
import ProductDetailsCarousel from "@/components/client/ProductDetailsCarousel";
import RelatedProducts from "@/components/client/RelatedProducts";
import Message from "@/components/common/Error/Message";
import { Loading } from "@/components/common/Loading";
import Rating from "@/components/common/Rating";
import Wrapper from "@/components/common/Wrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ratingOptions } from "@/data";

import { useGetProductBySlug } from "@/hooks/api/products/useGetProductBySlug";
import { useGetRelatedProducts } from "@/hooks/api/products/useGetRelatedProducts";
import { useReviewProduct } from "@/hooks/api/products/useReviewProduct";
import { useAuth } from "@/hooks/api/useAuth";
import { feedBackSchema, FeedbackType } from "@/lib/schemas/feedback";
import { addToCart } from "@/store/cart.store";
import { formatCurrencyVND } from "@/utils/format-currency";
import { parseHtml } from "@/utils/parse-html";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import moment from "moment";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
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

  const { isAuthenticated } = useAuth();
  const form = useForm({
    resolver: zodResolver(feedBackSchema),
    defaultValues: {
      rating: "",
      comment: "",
    },
  });

  const {
    control,
    formState: { isDirty, isValid },
  } = form;

  const { mutate: addReview } = useReviewProduct(productName);
  const handleReview: SubmitHandler<FeedbackType> = (data: FeedbackType) => {
    addReview(data, {
      onSuccess: () => {
        form.reset();
        toast.success("Đánh giá thành công");
      },
      onError: () => {
        toast.error("Đánh giá thất bại");
      },
    });
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
                              <div className="my-2 font-bold text-base">
                                {review.user.name} - {review.user.email}
                              </div>

                              <Rating rating={review.rating} />
                              <span>{moment(review.createdAt).calendar()}</span>
                              <div className="mt-3 alert alert-info">
                                {review.comment}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-8">
                        <h5>THÊM ĐÁNH GIÁ</h5>
                        {isAuthenticated ? (
                          <Form {...form}>
                            <form
                              className="space-y-2"
                              onSubmit={form.handleSubmit(handleReview)}
                            >
                              <FormField
                                control={control}
                                name="rating"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Đánh giá</FormLabel>
                                    <FormControl>
                                      <Select
                                        onValueChange={(value) => {
                                          field.onChange(value);
                                        }}
                                        value={field.value}
                                      >
                                        <SelectTrigger className="w-full">
                                          <SelectValue placeholder="Chọn đánh giá" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {ratingOptions.map((option) => {
                                            return (
                                              <SelectItem
                                                key={option.value}
                                                value={option.value}
                                              >
                                                {option.label}
                                              </SelectItem>
                                            );
                                          })}
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={control}
                                name="comment"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Bình luận</FormLabel>
                                    <FormControl>
                                      <Textarea {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <div className="my-3">
                                <Button disabled={!isDirty && !isValid}>
                                  Đăng
                                </Button>
                              </div>
                            </form>
                          </Form>
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
                      </div>
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
