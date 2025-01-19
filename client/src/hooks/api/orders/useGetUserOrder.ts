import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { useQuery } from "@tanstack/react-query";
export const useGetOrdersByUser = () => {
  const url = `/api/orders/user`;
  return useQuery({
    queryKey: [QUERY_KEYS.ORDERS],
    queryFn: async () => {
      const response = await API.get(url);
      return response.data;
    },
  });
};
