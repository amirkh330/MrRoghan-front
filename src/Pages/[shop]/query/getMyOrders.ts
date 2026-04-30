import { IMyOrder } from "@/Pages/[customer]/query/getMyOrderList";
import { fetchApi } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";

export const useGetMyOrders = (search?: string) => {

  return useQuery({
    queryKey: ["MyOrders", search],
    queryFn: async () => {
      const res = await fetchApi.get<IApiResponse<IMyOrder[]>>(
        `/shops/my-orders${search ? `?search=${encodeURIComponent(search)}` : ""
        }`
      );
      return res.data.data;
    },
  });
};
