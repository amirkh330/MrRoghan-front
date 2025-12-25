import { useApiService } from "@/settings/axiosConfig";
import { IApiResponse, ReminderDateEnum } from "@/utils/common";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface IReminder {
  id: string;
  reminderAt: string;
  status: string;
  retryCount: number;
  services: {
    title: string;
    reminder: string;
  }[];
  order: {
    price: string;
    currentDistance: string;
    nextDistance: string;
    user: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
    };
    shop: {
      shopName: string;
    };
  };
}

export const useGetReminder = (id: string) => {
  const api = useApiService();

  return useQuery({
    queryKey: ["reminder", id],
    queryFn: async () => {
      const res = await api.get<IApiResponse<IReminder[]>>(`reminder/${id}`);
      return res.data.data?.[0];
    },
  });
};
