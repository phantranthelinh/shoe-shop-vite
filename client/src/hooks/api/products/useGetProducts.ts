import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { useQuery } from "@tanstack/react-query";
export const useGetProducts = (params = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, JSON.stringify(params)],
    queryFn: async () => {
      const response = await API.get("/api/products", { params });
      return response.data;
    },
  });
};
