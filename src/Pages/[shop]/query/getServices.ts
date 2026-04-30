import { fetchApi } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";

export interface IServices {
  id: number;
  title: string;
}
export const useGetServices = (search: string) => {
  return useQuery({
    queryKey: ["services", search],

    queryFn: async () => {
      const res = await fetchApi.get<IServices[]>(
        `/common/services${
          search ? `?search=${encodeURIComponent(search)}` : ""
        }`,
      );
      return res;
    },
  });
};
