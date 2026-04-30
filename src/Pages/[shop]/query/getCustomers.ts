import { fetchApi } from "@/settings/axiosConfig";
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
      const res = await fetchApi.get<IMyCustomer[]>(
        `/shops/my-customers${
          search ? `?search=${encodeURIComponent(search)}` : ""
        }`,
      );
      return res.data;
    },
  });
};
