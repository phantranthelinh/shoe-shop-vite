import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { TCategory } from "@/types/category.type";
import { methodType } from "@/types/method.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMutationCategory = () => {
  const queryClient = useQueryClient();
  const apiMethods = {
    create: (data: TCategory) => API.post("/api/categories", data),
    update: (data: TCategory) => {
      const { id, ...rest } = data;
      return API.put(`/api/categories/${data._id}`, rest);
    },
    delete: (data: TCategory) => API.delete(`/api/categories/${data._id}`),
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
    return method(data as TCategory);
  };

  return useMutation({
    mutationKey: [QUERY_KEYS.UPDATE_CATEGORY],
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CATEGORIES] }); // Call the existing client
    },
  });
};
