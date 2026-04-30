import { fetchApi } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface IVehicle {
  id: number;
  title: string;
}

export const useGetVehicles = (search: string) => {


  return useQuery({
    queryKey: ["vehicles", search],
    queryFn: async () => {
      const res = await fetchApi.get<IApiResponse<IVehicle[]>>(
        `/admin/vehicles${search ? `?search=${encodeURIComponent(search)}` : ""
        }`
      );
      return res.data.data;
    },
  });
};

export const useAddVehicle = () => {


  return useMutation({
    mutationFn: async (payload: {
      title: string;
      isActive: boolean;
    }): Promise<IApiResponse<any>> => {
      const res = await fetchApi.post<IApiResponse<any>>("/admin/vehicles", payload);
      return res.data;
    },
  });
};

export const useEditVehicle = () => {


  return useMutation({
    mutationFn: async (payload: {
      id: string | number;
      title: string;
      isActive: boolean;
    }): Promise<IApiResponse<any>> => {
      const res = await fetchApi.patch<IApiResponse<any>>(
        `/admin/vehicles`,
        payload
      );
      return res.data;
    },
  });
};

export const useDeleteVehicle = () => {


  return useMutation({
    mutationFn: async (payload: {
      id: string | number;
    }): Promise<IApiResponse<any>> => {
      const res = await fetchApi.delete<IApiResponse<any>>(
        `/admin/vehicles/${payload.id}`
      );
      return res.data;
    },
  });
};
