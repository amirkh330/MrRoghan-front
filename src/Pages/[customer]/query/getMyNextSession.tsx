import { fetchApi } from "@/settings/axiosConfig";
import { IApiResponse, ReminderDateEnum } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";
import { IMyOrder } from "./getMyOrderList";
import useAuthStore from "@/store/authStore";

export interface NextSession {
  order: IMyOrder;
  nextSession: { reminderAt: string };
}

export const useGetMyNextSession = ({
  enabled = true,
}: {
  enabled?: boolean;
}) => {
  const { accessToken } = useAuthStore();

  return useQuery({
    queryKey: ["myNextSession", accessToken],
    queryFn: async () => {
      const res = await fetchApi.get<NextSession>("/users/next-stop");
      return res.data;
    },
    enabled: enabled || !!accessToken,
  });
};
