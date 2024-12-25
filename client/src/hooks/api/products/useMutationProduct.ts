import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { methodType } from "@/types/method.type";
import { TProduct } from "@/types/product.type";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useMutationProduct = () => {
  const queryClient = useQueryClient(); 
  const apiMethods = {
    create: (data: TProduct) => API.post("/api/products", data),
    update: (data: TProduct) => {
      const { id, ...productUpdate } = data;
      return API.put(`/api/products/${id}`, productUpdate);
    },
    delete: (data: TProduct) => API.delete(`/api/products/${data._id}`),
  };

  const mutationFn = async ({
    type,
    data,
  }: {
    type: methodType;
    data: { [key: string]: string | number };
  }) => {
    const method = apiMethods[type];
    if (!method) {
      throw new Error(`Invalid type: ${type}`);
    }
    return method(data as TProduct);
  };

  return useMutation({
    mutationKey: [QUERY_KEYS.UPDATE_PRODUCT],
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] }); // Call the existing client
    },
  });
};
