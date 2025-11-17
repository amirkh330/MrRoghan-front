import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type FormType = yup.InferType<typeof schema>;

export const useRegister = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FormType) => {
    console.log("ثبت نام:", data);
  };

  return { onSubmit, register, errors, isSubmitting, handleSubmit, setValue };
};
const schema = yup.object({
  firstName: yup.string().required("نام الزامی است"),
  lastName: yup.string().required("نام خانوادگی الزامی است"),
  phone: yup
    .string()
    .required("شماره تلفن الزامی است")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
  shopName: yup.string().required("نام مغازه الزامی است"),
  shopAddress: yup.string().required("آدرس مغازه الزامی است"),
});
