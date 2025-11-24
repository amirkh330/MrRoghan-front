import React from "react";
import { useGetMyOrderList } from "../query/getMyOrderList";

export const useCustomerReports = () => {
  const { data, isLoading } = useGetMyOrderList();
  return { data, isLoading };
};
