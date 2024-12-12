import { API } from "@/app/api";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data) => {
      return API.post("/api/auth/login", data);
    },
  });
};
