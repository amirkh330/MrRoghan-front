import { CallApi } from "@/settings/axiosConfig";
import { GlobalData } from "@/types/responses/ResponsesTypes";

const getSingleAwardsQueryFn = (
  id: number
): Promise<GlobalData<any>> =>
  CallApi.get(`about_us/awards-and-honors-detail/${id}/get/`);
export default getSingleAwardsQueryFn;
