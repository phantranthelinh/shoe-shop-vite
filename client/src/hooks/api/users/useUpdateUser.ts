import { API } from "@/app/api";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUser = (userId?: string) => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await API.put(`/api/users/${userId}/profile`, data);
      return response.data;
    },
  });
};
