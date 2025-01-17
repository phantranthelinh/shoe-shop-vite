import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { useQuery } from "@tanstack/react-query";
export const useGetProductBySlug = (productSlug: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, productSlug],
    queryFn: async () => {
      const response = await API.get(`/api/products/${productSlug}`);
      return response.data;
    },
  });
};
