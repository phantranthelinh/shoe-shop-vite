import { API } from "@/app/api";
import QUERY_KEYS from "@/constants/query-key";
import { District } from "@/entities/provinces";
import { useQuery } from "@tanstack/react-query";

const useGetDistrict = (provinceCode: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.DISTRICTS, provinceCode],
    queryFn: async () => {
      const response = await API.get(
        `/api/provinces/districts/${provinceCode}`
      );
      return response.data as District[];
    },
    enabled: !!provinceCode,
  });
};

export default useGetDistrict;
