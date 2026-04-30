import { fetchApi } from "@/settings/axiosConfig";
import { IApiResponse, ReminderDateEnum } from "@/utils/common";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface IPeriod {
  id: string;
  reminderAt: string;
  services: [
    {
      reminder: ReminderDateEnum;
      title: string;
      serviceId: string;
      id: string;
    },
  ];
  retryCount: number;
  status: "sent" | "failed";
}

export const useGetPeriods = (search: string) => {
  return useQuery({
    queryKey: ["periods", search],
    queryFn: async () => {
      const res = await fetchApi.get<IPeriod[]>(
        `/admin/reminder${
          search ? `?search=${encodeURIComponent(search)}` : ""
        }`,
      );
      return res.data;
    },
  });
};

export const useAddPeriod = () => {
  return useMutation({
    mutationFn: async (payload: {
      title: string;
      isActive: boolean;
    }): Promise<IApiResponse<any>> => {
      const res = await fetchApi.post<IApiResponse<any>>(
        "/admin/periods",
        payload,
      );
      return res.data;
    },
  });
};

export const useEditPeriod = () => {
  return useMutation({
    mutationFn: async (payload: {
      id: string | number;
      title: string;
      isActive: boolean;
    }): Promise<IApiResponse<any>> => {
      const res = await fetchApi.patch<IApiResponse<any>>(
        `/admin/periods/${payload.id}`,
        payload,
      );
      return res.data;
    },
  });
};

export const useDeletePeriod = () => {
  return useMutation({
    mutationFn: async (payload: {
      id: string | number;
    }): Promise<IApiResponse<any>> => {
      const res = await fetchApi.delete<IApiResponse<any>>(
        `/admin/periods/${payload.id}`,
      );
      return res.data;
    },
  });
};
