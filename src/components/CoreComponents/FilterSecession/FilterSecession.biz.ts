import { CallApi } from "@/settings/axiosConfig";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useFilterSecession = () => {
  const [timeFilterVisible, setTimeFilterVisible] = useState(false);
  const [whereFilterVisible, setWhereFilterVisible] = useState(false);
  const [typeFilterVisible, setTypeFilterVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<any>();
  const districts = searchParams.get("city");
  // افزودن فیلتر به URL
  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  };

  const [districtsList, setDistricts] = useState([]);

  useEffect(() => {
    CallApi.get("districts/_search").then(({ data }) => {
      setDistricts(data);
    });
  }, []);
  // const districtsList = [
  //   { id: -1, title: "همه" },
  //   { id: 1, title: "نارمک" },
  //   { id: 2, title: "هروی" },
  //   { id: 3, title: "جردن" },
  //   { id: 4, title: "ری" },
  //   { id: 5, title: "شمیران" },
  //   { id: 6, title: "پونک" },
  //   { id: 7, title: "قیطریه" },
  //   { id: 8, title: "صادقیه" },
  //   { id: 9, title: "تهرانپارس" },
  //   { id: 10, title: "سعادت‌آباد" },
  //   { id: 11, title: "ونک" },
  //   { id: 12, title: "ازگل" },
  //   { id: 13, title: "زعفرانیه" },
  //   { id: 14, title: "فرمانیه" },
  //   { id: 15, title: "شهرک غرب" },
  //   { id: 16, title: "مرزداران" },
  //   { id: 17, title: "آریاشهر" },
  //   { id: 18, title: "میرداماد" },
  //   { id: 19, title: "درکه" },
  //   { id: 20, title: "نیاوران" },
  //   { id: 21, title: "اوین" },
  //   { id: 22, title: "شهر ری" },
  //   { id: 23, title: "مجیدیه" },
  //   { id: 24, title: "خاوران" },
  //   { id: 25, title: "افسریه" },
  //   { id: 26, title: "جیحون" },
  //   { id: 27, title: "آزادی" },
  //   { id: 28, title: "دولت" },
  //   { id: 29, title: "شمیرانات" },
  //   { id: 30, title: "سوهانک" },
  //   { id: 31, title: "بریانک" },
  //   { id: 32, title: "دزاشیب" },
  //   { id: 33, title: "دولت‌آباد" },
  //   { id: 34, title: "شریعتی" },
  //   { id: 35, title: "باغ فیض" },
  //   { id: 36, title: "فرحزاد" },
  //   { id: 37, title: "شوش" },
  //   { id: 38, title: "لویزان" },
  //   { id: 39, title: "میدان ولیعصر" },
  //   { id: 40, title: "یوسف‌آباد" },
  //   { id: 41, title: "عباس‌آباد" },
  //   { id: 42, title: "طرشت" },
  //   { id: 43, title: "امیرآباد" },
  //   { id: 44, title: "پیروزی" },
  //   { id: 45, title: "کارگر شمالی" },
  //   { id: 46, title: "کارگر جنوبی" },
  //   { id: 47, title: "پاسداران" },
  //   { id: 48, title: "حکیمیه" },
  //   { id: 49, title: "نیرو هوایی" },
  //   { id: 50, title: "مولوی" },
  //   { id: 51, title: "بهارستان" },
  //   { id: 52, title: "فاطمی" },
  //   { id: 53, title: "خیابان انقلاب" },
  //   { id: 54, title: "امام حسین" },
  //   { id: 55, title: "پاسگاه نعمت‌آباد" },
  //   { id: 56, title: "ده ونک" },
  //   { id: 57, title: "شهران" },
  //   { id: 58, title: "چیتگر" },
  //   { id: 59, title: "بلوار فردوس" },
  //   { id: 60, title: "ستارخان" },
  // ];
  return {
    districtsList,
    handleFilterChange,
    timeFilterVisible,
    setTimeFilterVisible,
    whereFilterVisible,
    setWhereFilterVisible,
    typeFilterVisible,
    setTypeFilterVisible,
  };
};
