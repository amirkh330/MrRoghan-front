import { IMyOrder } from "@/Pages/[customer]/query/getMyOrderList";
import { fetchApi } from "@/settings/axiosConfig";
import { useQuery } from "@tanstack/react-query";

export const useGetMyOrders = (search?: string) => {
  return useQuery({
    queryKey: ["MyOrders", search],
    queryFn: async () => {
      const res = await fetchApi.get<IMyOrder[]>(
        `/shops/my-orders${
          search ? `?search=${encodeURIComponent(search)}` : ""
        }`,
      );
      return res.data;
    },
  });
};
