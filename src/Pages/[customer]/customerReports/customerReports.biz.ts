import React from "react";
import { useGetMyOrderList } from "../query/getMyOrderList";
import { useGetMyNextSession } from "../query/getMyNextSession";

export const useCustomerReports = () => {
  const { data, isLoading } = useGetMyOrderList();
  const { data: nextSession, isLoading: nextSessionLoading } =
    useGetMyNextSession();
    
  return { data, isLoading, nextSession, nextSessionLoading };
};
