import { API } from "@/app/api";
import { useMutation } from "@tanstack/react-query";

export const useMutationProduct = () => {
  return useMutation({
    mutationFn: async (payload: {
      type?: "create" | "update" | "delete";
      body: {
        [key: string]: string | number;
      };
    }) => {
      const { type, body } = payload;
      if (type === "create") {
        await API.post("/api/products", body);
      } else if (type === "update") {
        const { id, ...bodyUpdate} = body
        await API.put(`/api/products/${id}`, bodyUpdate);
      } else {
        await API.delete(`/api/products/${body.id}`);
      }
    },
  });
};
