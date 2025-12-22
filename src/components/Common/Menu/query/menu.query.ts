import { useApiService } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";

export const useGetMessageCount = ({ isShop }: { isShop: boolean }) => {
  const api = useApiService();

  return useQuery({
    queryKey: ["message-count", isShop],
    queryFn: async () => {
      const res = await api.get<IApiResponse<any>>(`/shops/message-count`);
      return res.data.data;
    },
    enabled: isShop,
  });
};
