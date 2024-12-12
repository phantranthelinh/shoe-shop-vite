import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { useQuery } from "@tanstack/react-query";
export const useGetProducts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: async () => {
      const response = await API.get("/api/products/all");
      return response.data;
    },
  });
};
