import { useGetMyCustomers } from "../query/getCustomers";

export const useShopCustomers = () => {
  const { data, isLoading } = useGetMyCustomers();
  return { data, isLoading };
};
