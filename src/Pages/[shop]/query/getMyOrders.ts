import { IMyOrder } from "@/Pages/[customer]/query/getMyOrderList";
import { useApiService } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";

export const useGetMyOrders = (search?: string) => {
  const api = useApiService();
  return useQuery({
    queryKey: ["MyOrders", search],
    queryFn: async () => {
      const res = await api.get<IApiResponse<IMyOrder[]>>(
        `/shops/my-orders${
          search ? `?search=${encodeURIComponent(search)}` : ""
        }`
      );
      return res.data.data;
    },
  });
};
