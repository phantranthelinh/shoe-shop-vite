import { API } from "@/app/api";
import { TUser } from "@/types/user.type";
import { removeFromLocal, storeInLocal } from "@/utils/local-storage.util";
import { useMutation } from "@tanstack/react-query";
import { redirect, useNavigate } from "@tanstack/react-router";

export const useAuth = () => {
  const navigate = useNavigate();
  const { mutate: login } = useMutation({
    mutationFn: async (data: TUser) => {
      const response = await API.post("/api/users/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      storeInLocal("token", data.token);
      navigate({ to: "/dashboard" });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const logout = () => {
    removeFromLocal("token");
    redirect({
      to: "/",
    });
  };
  return {
    login,
    logout,
  };
};
