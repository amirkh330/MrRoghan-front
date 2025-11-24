import { useApiService } from "@/settings/axiosConfig";
import { IApiResponse, UsageEnum } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";

export interface IMyOrder {
  id: number;
  currentDistance: string | null;
  nextDistance: string | null;
  vehicle: number;
  instrument: { title: string; id: number }[];
  price: string | null;
  description: string | null;
  usage: UsageEnum;
  createdAt: string; // یا Date اگر میخوای تبدیل کنی
  shop: {
    id: number;
    shopName: string;
    address: string;
  } | null; // اگر ممکنه shop هم null باشه
}

export const useGetMyOrderList = () => {
  const api = useApiService();

  return useQuery({
    queryKey: ["myOrderList"],
    queryFn: async () => {
      const res = await api.get<IApiResponse<IMyOrder[]>>("/users/my-orders");
      return res.data;
    },
  });
};
