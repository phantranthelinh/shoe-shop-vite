import { API } from "@/app/api";
import { useMutation } from "@tanstack/react-query";

export const useCancelOrder = (orderId: string) => {
  const url = `/api/orders/${orderId}/cancel`;
  return useMutation({
    mutationFn: async () => {
      const response = await API.put(url);
      return response.data;
    },
  });
};
