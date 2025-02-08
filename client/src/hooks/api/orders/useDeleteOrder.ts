import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId: string) => {
      const response = await API.delete(`/api/orders/${orderId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDERS] });
    },
  });
};
