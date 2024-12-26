import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { TUser } from "@/types/user.type";
import { removeFromLocal, storeInLocal } from "@/utils/local-storage.util";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useAuth = () => {
  const navigate = useNavigate();
  const { isSuccess: isAuthenticated } = useQuery({
    queryKey: [QUERY_KEYS.AUTH],
    queryFn: async () => {
      const response = await API.get("/api/users/profile");
      return response.data;
    },
    retry: 3,
  });

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

    navigate({
      to: "/login",
    });
  };
  return {
    login,
    logout,
    isAuthenticated,
  };
};
export type AuthContext = ReturnType<typeof useAuth>;
