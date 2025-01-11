import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { Ward } from "@/entities/provinces";
import { useQuery } from "@tanstack/react-query";

const useGetWards = (districtCode: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.DISTRICTS, districtCode],
    queryFn: async () => {
      const response = await API.get(
        `/api/provinces/districts/${districtCode}`
      );
      return response.data as Ward[];
    },
    enabled: !!districtCode,
  });
};

export default useGetWards;
