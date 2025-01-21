import { API } from "@/app/api";
import { FeedbackType } from "@/lib/schemas/feedback";
import { useMutation } from "@tanstack/react-query";
export const useReviewProduct = (productSlug: string) => {
  return useMutation({
    mutationFn: async (data: FeedbackType) => {
      const response = await API.post(
        `/api/products/${productSlug}/review`,
        data
      );
      return response.data;
    },
  });
};
