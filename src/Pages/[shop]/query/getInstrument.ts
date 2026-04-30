import { fetchApi } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";

export interface IInstrument {
  id: number;
  title: string;
}
export const useGetInstrument = () => {


  return useQuery({
    queryKey: ["instrument"],
    queryFn: async () => {
      const res = await fetchApi.get<IApiResponse<IInstrument[]>>(
        "/common/instrument"
      );
      return res.data;
    },
  });
};
