import { useApiService } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";

export interface IProfile {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  role: string;
  shopName: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
}
export const useGetProfile = () => {
  const api = useApiService();

  return useQuery({
    queryKey: ["get-profile"],
    queryFn: async () => {
      const res = await api.get<IApiResponse<IProfile>>(`/shops/get-profile`);
      return res.data.data;
    },
    staleTime: 0, // داده‌ها بلافاصله stale می‌شن
    refetchOnMount: "always", // هر بار mount دوباره fetch کنه
    refetchOnWindowFocus: false, //
  });
};
