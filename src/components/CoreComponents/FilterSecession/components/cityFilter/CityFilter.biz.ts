import { CallApi } from "@/settings/axiosConfig";
import { useEffect, useState } from "react";

export const useCityFilter = () => {
  const [whereFilterVisible, setWhereFilterVisible] = useState(false);
  // const [districts, setDistricts] = useState([]);

  // useEffect(() => {
  //   CallApi.get("districts/_search").then(({ data }) => {
  //     setDistricts(data);
  //   });
  // }, []);

  return { whereFilterVisible, setWhereFilterVisible,  };
};
