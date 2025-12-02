import { useApiService } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";

export interface IInstrument {
  id: number;
  title: string;
}
export const useGetMyCustomers = () => {
  const api = useApiService();

  return useQuery({
    queryKey: ["my-customers"],
    queryFn: async () => {
      const res = await api.get<IApiResponse<any[]>>("/shops/my-customers");
      return res.data.data;
    },
  });
};
