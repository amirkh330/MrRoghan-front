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

    // 🔥 مهم‌ترین تنظیمات
    staleTime: 0, // دیتا همیشه stale
    gcTime: 0, // (React Query v5) = بدون کش
    refetchOnMount: "always", // با هر mount
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: false,
  });
};
