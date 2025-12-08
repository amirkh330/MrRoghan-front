import debounce from "lodash.debounce";
import { useState } from "react";
import { useGetMyCustomers } from "../query/getCustomers";
import { useNavigate, useNavigation } from "react-router-dom";

export const useShopCustomers = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetMyCustomers("");

  const debouncedSearch = debounce((val: string) => {
    setSearch(val);
  }, 700);

  return {
    data,

    navigate,
    isLoading,
    search,
    setSearch,
    debouncedSearch,
    value,
    setValue,
  };
};
