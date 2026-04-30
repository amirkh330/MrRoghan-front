import { fetchApi } from "@/settings/axiosConfig";
import useAuthStore from "@/store/authStore";
import { IApiResponse, ReminderDateEnum } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";

export interface IMyOrder {
  id: number;
  currentDistance: string | null;
  nextDistance: string | null;
  vehicle: { id: string; title: string } | null;
  price: string | null;
  description: string | null;
  services: { title: string; serviceId: number; reminder: ReminderDateEnum }[];
  createdAt: string; // یا Date اگر میخوای تبدیل کنی
  user: {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  shop: {
    id: number;
    shopName: string;
    address: string;
  } | null; // اگر ممکنه shop هم null باشه
}

export const useGetMyOrderList = () => {
  const { accessToken } = useAuthStore();

  return useQuery({
    queryKey: ["myOrderList", accessToken],
    queryFn: async () => {
      const res = await fetchApi.get<IMyOrder[]>("/users/my-orders");
      return res.data;
    },
    enabled: !!accessToken,
  });
};
