import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BaseURL } from "@/utils/common";
import { useToast } from "@chakra-ui/react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { RouteConst } from "@/utils/allRoutes.type";
import { useGetProfile } from "../query/getProfile";
import { useUpdateProfile } from "../query/editProfile";

type FormType = yup.InferType<typeof schema>;

export const useShopProfile = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [search] = useSearchParams(window.location.href);

  const { data,isLoading } = useGetProfile();
  const { mutateAsync } = useUpdateProfile();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (data) {
      reset(data as any);
    }
  }, [data]);

  useEffect(() => {
    if (search.get("phoneNumber")) {
      setValue("phoneNumber", search.get("phoneNumber") as string);
    }
  }, [search]);

  const onSubmit = (data: FormType) => {
    setLoading(true);
    mutateAsync(data).then(() => {
      toast({
        title: "ویرایش با موفقیت انجام شد",
        status: "success",
        position: "top",
      });
      navigate(RouteConst.shopDashboard);
    });
  };

  return {
    onSubmit,
    register,
    watch,
    isLoading,
    errors,
    data,
    isSubmitting,
    handleSubmit,
    setValue,
    loading,
  };
};

const schema = yup.object({
  firstName: yup.string().required("نام الزامی است"),
  lastName: yup.string().required("نام خانوادگی الزامی است"),
  phoneNumber: yup
    .string()
    .required("شماره تلفن الزامی است")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
  shopName: yup.string().required("نام مغازه الزامی است"),
  address: yup.string().required("آدرس مغازه الزامی است"),
  location: yup
    .object({
      lat: yup.number().required("عرض جغرافیایی الزامی است"),
      lng: yup.number().required("طول جغرافیایی الزامی است"),
    })
    .required("موقعیت الزامی است"),
});
