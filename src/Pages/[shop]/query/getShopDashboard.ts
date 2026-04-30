import { fetchApi } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";

export interface IShopDashboard {
  totalCustomers: number;
  todayService: number;
  weekService: number;
  monthService: number;
  todayIncome: number;
  monthIncome: number;
}
export const useGetShopDashboard = () => {
  return useQuery({
    queryKey: ["shop-dashboard"],
    queryFn: async () => {
      const res =
        await fetchApi.get<IApiResponse<IShopDashboard>>("/shops/dashboard");
      return res.data.data;
    },
  });
};
