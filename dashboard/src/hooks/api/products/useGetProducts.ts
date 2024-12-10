import { API } from "@/app/api";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = (params = {}) => {
  return useQuery({
    queryKey: ["products", JSON.stringify(params)],
    queryFn: async () => {
      const response = await API.get("/api/products", { params });
      return response.data
    },
  });
};
