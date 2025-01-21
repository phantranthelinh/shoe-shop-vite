import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Order } from "@/entities/order";
import { Eye } from "lucide-react";

interface Props {
  data: Order;
}

const OrderDetail = ({ data }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size={"icon"} variant={"outline"}>
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xem chi tiết đơn hàng</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="bg-white shadow-md p-4 rounded-md">
          <div className="mb-2 font-bold text-lg">
            Mã đơn hàng: {"NIKE" + data._id.slice(0, 6)}
          </div>
          <div className="mb-2 font-medium text-lg">
            Tên khách hàng: {data?.shippingInfo?.customerName}
          </div>
          <div className="mb-2 font-medium text-lg">Thông tin giao hàng</div>
          <div className="ml-4">
            <div className="mb-1 font-medium text-lg">
              Số điện thoại: {data?.shippingInfo?.phoneNumber}
            </div>
            <p className="mb-1 font-medium text-lg">
              Địa chỉ: {data?.shippingInfo?.address}{" "}
              {data?.shippingInfo?.ward.name},{" "}
              {data?.shippingInfo?.district.name},{" "}
              {data.shippingInfo?.province.name},{" "}
            </p>
            <div className="mb-1 font-medium text-lg">
              {data?.shippingInfo?.address}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetail;
