import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { methodType } from "@/types/method.type";
import { TProduct } from "@/types/product.type";
import { QueryClient, useMutation } from "@tanstack/react-query";

export const useMutationProduct = () => {
  const apiMethods = {
    create: (product: TProduct) => API.post("/api/products", product),
    update: (product: TProduct) => {
      const { id, ...productUpdate } = product;
      return API.put(`/api/products/${id}`, productUpdate);
    },
    delete: (product: TProduct) => API.delete(`/api/products/${product.id}`),
  };

  const mutationFn = async ({
    type,
    product,
  }: {
    type: methodType;
    product: { [key: string]: string | number };
  }) => {
    const method = apiMethods[type];
    if (!method) {
      throw new Error(`Invalid type: ${type}`);
    }
    return method(product as TProduct);
  };

  return useMutation({
    mutationKey: [QUERY_KEYS.UPDATE_PRODUCT],
    mutationFn,
    onSuccess: () => {
      new QueryClient().invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
    },
  });
};
