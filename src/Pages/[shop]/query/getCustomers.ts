import { fetchApi } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";

export interface IMyCustomer {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  vehicle: { id: string; title: string }[];
}
export const useGetMyCustomers = (search: string) => {


  return useQuery({
    queryKey: ["my-customers", search],
    queryFn: async () => {
      const res = await fetchApi.get<IApiResponse<IMyCustomer[]>>(
        `/shops/my-customers${search ? `?search=${encodeURIComponent(search)}` : ""
        }`
      );
      return res.data.data;
    },
  });
};
