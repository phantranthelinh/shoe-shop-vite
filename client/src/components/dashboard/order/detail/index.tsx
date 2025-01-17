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

const OrderDetail = ({ data }: { data: Order }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size={"icon"} variant={"outline"}>
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xem thông tin đơn hàng</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="bg-white shadow-md p-4 rounded-md">
          <div className="mb-2 font-bold text-lg">
            Mã đơn hàng: {"NIKE" + data._id.slice(0, 6)}
          </div>
          <div className="mb-2 font-medium text-lg">
            Tên khách hàng: {data.shippingInfo.customerName}
          </div>
          <div className="mb-2 font-medium text-lg">Thông tin giao hàng</div>
          <div className="ml-4">
            <div className="mb-1 font-medium text-lg">
              Số điện thoại: {data.shippingInfo.phoneNumber}
            </div>
            <div className="mb-1 font-medium text-lg">Địa chỉ: </div>
            <div className="mb-1 font-medium text-lg">
              {data.shippingInfo.province}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetail;
