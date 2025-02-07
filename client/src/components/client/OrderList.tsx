import { Order } from "@/models/order";
import { formatCurrencyVND } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import { getOrderCode } from "@/utils/helper";
import { Link } from "@tanstack/react-router";

interface OrderListProps {
  data: Order[];
}
const OrderList = ({ data }: OrderListProps) => {
  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Mã đơn hàng</th>
            <th className="px-4 py-2 text-left">Sản phẩm</th>
            <th className="px-4 py-2 text-left">Tổng tiền</th>
            <th className="px-4 py-2 text-left">Ngày đặt hàng</th>
            <th className="px-4 py-2 text-left">Thanh toán</th>
            <th className="px-4 py-2 text-left">Vận chuyển</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: Order) => (
            <tr key={item?._id} className="border-gray-200 border-b">
              <td className="px-4 py-2">
                <Link to={`/orders/${item?._id}`}>
                  {getOrderCode(item?._id)}
                </Link>
              </td>
              <td className="px-4 py-2">
                {item.orderItems.reduce((sum, item) => sum + item.qty, 0)}
              </td>
              <td className="px-4 py-2 font-bold">
                {formatCurrencyVND(item.totalPrice)}
              </td>
              <td className="px-4 py-2">{formatDate(item.createdAt)}</td>
              <td className="px-4 py-2">
                {item.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
              </td>

              <td className="px-4 py-2">
                {item.isDelivered ? "Đã giao hàng" : "Đang giao hàng"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
