import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { useQuery } from "@tanstack/react-query";
export const useGetOrders = () => {
  const url = "/api/orders";
  return useQuery({
    queryKey: [QUERY_KEYS.ORDERS],
    queryFn: async () => {
      const response = await API.get(url);
      return response.data;
    },
  });
};
