import { useApiService } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";

export interface IInstrument {
  id: number;
  title: string;
}
export const useGetMyCustomers = (search: string) => {
  const api = useApiService();

  return useQuery({
    queryKey: ["my-customers", search],
    queryFn: async () => {
      const res = await api.get<IApiResponse<any[]>>(
        `/shops/my-customers${
          search ? `?search=${encodeURIComponent(search)}` : ""
        }`
      );
      return res.data.data;
    },
  });
};
