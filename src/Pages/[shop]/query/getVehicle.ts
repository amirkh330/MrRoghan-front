import { fetchApi } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";

export interface IVehicle {
  id: number;
  title: string;
}
export const useGetVehicles = () => {
  return useQuery({
    queryKey: ["vehicle"],
    queryFn: async () => {
      const res = await fetchApi.get<IVehicle[]>("/common/vehicle");
      return res.data;
    },
  });
};
