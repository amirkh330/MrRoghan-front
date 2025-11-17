import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  customerPhone: yup
    .string()
    .required("شماره مشتری الزامی است")
    .matches(/^09\d{9}$/, "شماره مشتری معتبر نیست"),

  firstName: yup.string().optional(),
  lastName: yup.string().optional(),

  carName: yup.string().required("نام خودرو الزامی است"),

  parts: yup.array().of(
    yup.object({
      title: yup.string().required("نام قطعه الزامی است"),
    })
  ),

  currentKm: yup
    .number()
    .typeError("باید عدد باشد")
    .required("کیلومتر فعلی الزامی است")
    .min(100, "کم‌تر از 100 معتبر نیست")
    .max(300000, "کیلومتر معتبر نیست"),

  nextKm: yup
    .number()
    .typeError("باید عدد باشد")
    .required("کیلومتر بعدی الزامی است")
    .moreThan(yup.ref("currentKm"), "کیلومتر بعدی باید بزرگ‌تر از فعلی باشد"),

  usage: yup.string().required("میزان استفاده الزامی است"),

  notes: yup.string().optional(),

  amount: yup
    .number()
    .typeError("باید عدد باشد")
    .required("مبلغ الزامی است")
    .min(10000, "مبلغ معتبر نیست"),
});

type FormType = yup.InferType<typeof schema>;

export const useShopCreateOrder = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      parts: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "parts",
  });

  const onSubmit = (data: FormType) => {
    console.log("📦 Order Created:", data);
  };

  return {
    register,
    control,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    fields,
    append,
    remove,
    watch,
    onSubmit,
  };
};
