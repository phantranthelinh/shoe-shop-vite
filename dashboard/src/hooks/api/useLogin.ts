import { API } from "@/app/api";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await API.post("/api/users/login", data);
      return response.data
    },
  });
};
