import { useApiService } from "@/settings/axiosConfig";
import { IApiResponse } from "@/utils/common";
import { useMutation } from "@tanstack/react-query";

// DTO برای آپدیت پروفایل
export interface IUpdateProfileDto {
  shopName?: string;
  address?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export const useUpdateProfile = () => {
  const api = useApiService();

  return useMutation<IApiResponse<any>, unknown, IUpdateProfileDto>({
    mutationFn: async (payload: IUpdateProfileDto) => {
      const response = await api.post<IApiResponse<any>>(
        "/shops/edit-profile",
        payload
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Profile updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });
};
