import { fetchApi } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface IServices {
  id: number;
  title: string;
}

export const useGetServices = (search: string) => {


  return useQuery({
    queryKey: ["admin-services", search],
    queryFn: async () => {
      const res = await fetchApi.get<IApiResponse<IServices[]>>(
        `/admin/service${search ? `?search=${encodeURIComponent(search)}` : ""}`
      );
      return res.data.data;
    },
  });
};

export const useAddService = () => {


  return useMutation({
    mutationFn: async (payload: {
      title: string;
    }): Promise<IApiResponse<any>> => {
      const res = await fetchApi.post<IApiResponse<any>>("/admin/service", payload);
      return res.data;
    },
  });
};

export const useEditService = () => {


  return useMutation({
    mutationFn: async (payload: {
      id: string;
      title?: string;
      isActive?: boolean;
    }): Promise<IApiResponse<any>> => {
      const res = await fetchApi.patch<IApiResponse<any>>(`/admin/service`, payload);
      return res.data;
    },
  });
};

export const useDeleteService = () => {


  return useMutation({
    mutationFn: async (payload: number): Promise<IApiResponse<any>> => {
      const res = await fetchApi.delete<IApiResponse<any>>(
        `/admin/service/${payload}`
      );
      return res.data;
    },
  });
};
