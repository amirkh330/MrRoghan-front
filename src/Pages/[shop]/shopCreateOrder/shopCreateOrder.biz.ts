import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { useGetVehicles } from "../query/getVehicle";
import { useGetInstrument } from "../query/getInstrument";
import { ICreateOrderDto, useCreateOrder } from "../query/postCreateOrder";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { title } from "process";
import { useState } from "react";
import { useGetUserExist } from "../query/getUserExist";

export const useShopCreateOrder = () => {
  const toast = useToast();
  const { data: vehiclesList } = useGetVehicles();
  const { data: instrumentList } = useGetInstrument();

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const {
    isOpen: isOpenPhoneNumber,
    onOpen: onOpenPhoneNumber,
    onClose: onClosePhoneNumber,
  } = useDisclosure();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { mutateAsync: createOrderApi, isPending } = useCreateOrder();
  const { mutateAsync: getUserExist, isPending: userExistLoading } =
    useGetUserExist();

  const {
    register,
    reset,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      instrument: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "instrument",
  });

  const onSubmit = (data: FormType) => {
    const payload = {
      ...data,
      instrument: data?.instrument?.map((item) => item.id),
      price: data.price.replace(/,/g, ""),
      vehicle: Number(data.vehicle),
      currentDistance: data.currentDistance.replace(/,/g, ""),
      nextDistance: data.nextDistance.replace(/,/g, ""),
    };
    createOrderApi(payload as any).then(() => {
      reset();
      toast({
        title: "سرویس با موفقیت ثبت شد",
        status: "success",
        position: "top",
      });
    });
  };

  const handleSelectPhoneNumber = () => {
    getUserExist({ phoneNumber })
      .then(({ data }) => {
        setIsDisabled(true);
        reset({
          phoneNumber: data.phoneNumber,
          customer_firstName: data.firstName,
          customer_lastName: data.lastName,
        });

        onClose();
      })
      .catch(() => {
        toast({
          title: "کاربری با این شماره یافت نشد",
          description: "لطفا اطلاعات مشتری را وارد نمایید",
          status: "warning",
          position: "top",
        });
        reset({
          phoneNumber: phoneNumber,
        });
      });
  };

  return {
    register,
    isDisabled,
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
    vehiclesList,
    isPending,
    instrumentList,
    isOpen,
    onOpen,
    onClose,
    phoneNumber,
    setPhoneNumber,
    handleSelectPhoneNumber,
    isOpenPhoneNumber,
    onOpenPhoneNumber,
    onClosePhoneNumber,
  };
};

const schema = yup.object({
  phoneNumber: yup
    .string()
    .required("شماره مشتری الزامی است")
    .matches(/^09\d{9}$/, "شماره مشتری معتبر نیست"),

  customer_firstName: yup.string().optional(),
  customer_lastName: yup.string().optional(),

  vehicle: yup.string().required("نام خودرو الزامی است"),

  instrument: yup.array().of(
    yup.object({
      id: yup.number().required("نام قطعه الزامی است"),
      title: yup.string().required("نام قطعه الزامی است"),
    })
  ),

  currentDistance: yup
    .string()
    .typeError("باید عدد باشد")
    .required("کیلومتر فعلی الزامی است"),

  nextDistance: yup
    .string()
    .typeError("باید عدد باشد")
    .required("کیلومتر بعدی الزامی است"),

  usage: yup.string().required("میزان استفاده الزامی است"),

  description: yup.string().optional(),

  price: yup.string().typeError("باید عدد باشد").required("مبلغ الزامی است"),
});

type FormType = yup.InferType<typeof schema>;
