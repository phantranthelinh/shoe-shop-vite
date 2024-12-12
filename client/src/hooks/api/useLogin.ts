import { API } from "@/app/api";
import { TUser } from "@/types/user.type";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: TUser) => {
      const response = await API.post("/api/users/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate({ to: "/dashboard" });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
