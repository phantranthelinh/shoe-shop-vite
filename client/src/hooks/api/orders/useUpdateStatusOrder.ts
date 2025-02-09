import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateOrderStatus = (orderId: string) => {
  const url = `/api/orders/${orderId}/order-status`;
  return useMutation({
    mutationFn: async (data: { orderStatus: string }) => {
      const response = await API.put(url, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Cập nhật trạng thái đơn hàng thành công!");
    },
    onError: () => {
      toast.success("Lỗi");
    },
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId: string) => {
      const response = await API.put(`/api/orders/${orderId}/cancel`);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ORDERS, data._id],
      });
    },
  });
};
