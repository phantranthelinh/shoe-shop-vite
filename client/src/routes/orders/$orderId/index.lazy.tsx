/* eslint-disable @typescript-eslint/no-explicit-any */
import MainLayout from "@/components/client/layout";
import { Loading } from "@/components/common/Loading";
import { useGetOrder } from "@/hooks/api/orders/useGetOrder";
import { formatCurrencyVND } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import { getOrderCode } from "@/utils/helper";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/orders/$orderId/")({
  component: OrderDetail,
});

function OrderDetail() {
  const { orderId } = Route.useParams();
  const { isLoading, data } = useGetOrder(orderId);

  return (
    <MainLayout classNames="min-h-[60vh]">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-2 w-full max-w-2xl">
          <div className="font-bold text-2xl">Chi tiết đơn hàng</div>
          <div>Mã đơn: {getOrderCode(data?._id)}</div>
          <div>Ngày đặt hàng: {formatDate(data?.createdAt ?? "")}</div>
          <hr className="my-4" />
          {data?.orderItems?.map((item: any) => (
            <div key={item._id}>
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    className="w-[50px] h-[50px] object-cover"
                  />
                  <div>
                    <h2 className="text-black/[.8] text-lg">{item.name}</h2>
                    <h2 className="text-black/[.8] text-lg">x{item.qty}</h2>
                  </div>
                </div>
                <div className="flex items-end font-bold">
                  {formatCurrencyVND(item.price)}
                </div>
              </div>
            </div>
          ))}
          <hr className="my-4" />
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="font-bold text-lg">Thanh toán</div>
              <div>
                Tổng cộng:{" "}
                <span className="font-bold">
                  {formatCurrencyVND(data?.totalPrice)}
                </span>
              </div>
              <span>
                Phương thức thanh toán:
                <span> {data?.paymentMethod?.toLocaleUpperCase()}</span>
              </span>
              <span>
                Trạng thái: {data?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-bold text-lg">Thông tin vận chuyển</div>
              <span>Họ tên: {data?.shippingInfo?.customerName}</span>
              <span>Số điện thoại: {data?.shippingInfo?.phoneNumber}</span>
              <p>
                Địa chỉ: {data?.shippingInfo?.address},{" "}
                {data?.shippingInfo?.province?.name},{" "}
                {data?.shippingInfo?.district?.name},{" "}
                {data?.shippingInfo?.ward?.name}
              </p>
              <span>
                Trạng thái:{" "}
                {data?.isDelivered ? "Đã giao hàng" : "Đang giao hàng"}
              </span>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
