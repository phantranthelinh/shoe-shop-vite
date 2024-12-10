import { API } from "@/app/api";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data) => {
      await API.post("/api/users/login", data);
    },
  });
};
