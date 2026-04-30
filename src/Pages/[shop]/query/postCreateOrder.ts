import { fetchApi } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useMutation } from "@tanstack/react-query";

export interface ICreateOrderDto {
  customer_firstName?: string;
  customer_lastName?: string;
  currentDistance: string;
  instrument: number[];
  nextDistance: string;
  phoneNumber: string;
  description?: string;
  vehicle: number;
  price: string;
  usage: "short" | "medium" | "long";
}

export const useCreateOrder = () => {


  return useMutation({
    mutationFn: async (
      payload: ICreateOrderDto
    ): Promise<IApiResponse<any>> => {
      const res = await fetchApi.post<IApiResponse<any>>("/orders/create", payload);
      return res.data;
    },
  });
};
