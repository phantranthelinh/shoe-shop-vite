import { API } from "@/app/api";
import { useMutation } from "@tanstack/react-query";

export const useUpdateOrderStatus = (orderId: string) => {
  const url = `/api/orders/${orderId}/order-status`;
  return useMutation({
    mutationFn: async (data: { orderStatus: string }) => {
      const response = await API.put(url, data);
      return response.data;
    },
  });
};
