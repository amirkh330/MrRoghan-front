import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import { Plus, Trash } from "@phosphor-icons/react";
import { useShopCreateOrder } from "./shopCreateOrder.biz";
import { persianToEnglishNumbers } from "@/utils/convertNumber/ConvertNumber";
import { Toman } from "@/utils/Toman/Toman";

export const ShopCreateOrder = () => {
  const {
    append,
    remove,
    fields,
    register,
    isSubmitting,
    handleSubmit,
    watch,
    errors,
    onSubmit,
    setValue,
  } = useShopCreateOrder();

  return (
    <Box bg="amir.mainBg" color="amir.common" px="4" py="6" minH="100dvh">
      <Text fontSize="22px" fontWeight="bold" mb="6" color="amir.primary">
        ساخت سرویس جدید
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="5">
          {/* شماره مشتری */}
          <FormControl isInvalid={!!errors.customerPhone}>
            <FormLabel>شماره مشتری</FormLabel>
            <Input
              {...register("customerPhone")}
              placeholder="09123456789"
              bg="amir.secondaryBg"
            />
            <FormErrorMessage>{errors.customerPhone?.message}</FormErrorMessage>
          </FormControl>

          {/* نام */}
          <FormControl isInvalid={!!errors.firstName}>
            <FormLabel>نام مشتری (اختیاری)</FormLabel>
            <Input
              {...register("firstName")}
              placeholder="نام"
              bg="amir.secondaryBg"
            />
            <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
          </FormControl>

          {/* نام خانوادگی */}
          <FormControl isInvalid={!!errors.lastName}>
            <FormLabel>نام خانوادگی مشتری (اختیاری)</FormLabel>
            <Input
              {...register("lastName")}
              placeholder="نام خانوادگی"
              bg="amir.secondaryBg"
            />
            <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
          </FormControl>

          {/* نام خودرو */}
          <FormControl isInvalid={!!errors.carName}>
            <FormLabel>نام خودرو</FormLabel>
            <Input
              {...register("carName")}
              placeholder="مثلاً پژو 206"
              bg="amir.secondaryBg"
            />
            <FormErrorMessage>{errors.carName?.message}</FormErrorMessage>
          </FormControl>

          {/* قطعات تعویض‌شده */}
          <Box width="100%">
            <Text mb="2" fontWeight="600">
              لیست قطعات تعویض شده
            </Text>

            {/* SELECT برای انتخاب چند قطعه */}
            <Select
              placeholder="انتخاب قطعه"
              bg="amir.secondaryBg"
              mb={3}
              onChange={(e) => {
                const value = e.target.value;
                if (!value) return;

                append({ title: value });
              }}
            >
              <option value="روغن موتور">روغن موتور</option>
              <option value="فیلتر روغن">فیلتر روغن</option>
              <option value="فیلتر هوا">فیلتر هوا</option>
              <option value="فیلتر کابین">فیلتر کابین</option>
              <option value="شمع">شمع</option>
              <option value="لنت جلو">لنت جلو</option>
              <option value="لنت عقب">لنت عقب</option>
              <option value="لاستیک">لاستیک</option>
              <option value="ضدیخ">ضدیخ</option>
            </Select>

            {/* فهرست انتخاب‌شده‌ها */}
            {fields.map((field, index) => (
              <HStack key={field.id} mb="3" align="center">
                <Box
                  flex="1"
                  bg="amir.secondaryBg"
                  px="3"
                  py="2"
                  borderRadius="6px"
                  border="1px solid #555"
                >
                  <Text fontSize="14px">{field.title}</Text>
                </Box>

                <IconButton
                  aria-label="delete"
                  icon={<Trash />}
                  size="sm"
                  onClick={() => remove(index)}
                />
              </HStack>
            ))}
          </Box>

          {/* کیلومتر فعلی */}
          <FormControl isInvalid={!!errors.currentKm}>
            <FormLabel>کیلومتر فعلی</FormLabel>
            <Input
              {...register("currentKm")}
              onChange={(e) =>
                setValue("currentKm", persianToEnglishNumbers(e.target.value))
              }
              placeholder="مثلاً 150000"
              bg="amir.secondaryBg"
              inputMode="numeric"
            />
            <FormErrorMessage>{errors.currentKm?.message}</FormErrorMessage>
          </FormControl>

          {/* کیلومتر بعدی */}
          <FormControl isInvalid={!!errors.nextKm}>
            <FormLabel>کیلومتر بعدی</FormLabel>
            <Input
              {...register("nextKm")}
              onChange={(e) =>
                setValue("nextKm", persianToEnglishNumbers(e.target.value))
              }
              placeholder="مثلاً 160000"
              bg="amir.secondaryBg"
              inputMode="numeric"
            />
            <FormErrorMessage>{errors.nextKm?.message}</FormErrorMessage>
          </FormControl>

          {/* میزان استفاده از ماشین */}
          <FormControl isInvalid={!!errors.usage}>
            <FormLabel>میزان استفاده از ماشین</FormLabel>
            <Select
              {...register("usage")}
              placeholder="انتخاب کنید"
              bg="amir.secondaryBg"
            >
              <option value="low">کم</option>
              <option value="medium">متوسط</option>
              <option value="high">زیاد</option>
            </Select>
            <FormErrorMessage>{errors.usage?.message}</FormErrorMessage>
          </FormControl>

          {/* توضیحات */}
          <FormControl>
            <FormLabel>توضیحات برای دفعه بعدی</FormLabel>
            <Textarea
              {...register("notes")}
              placeholder="یادداشت..."
              bg="amir.secondaryBg"
              rows={3}
            />
          </FormControl>

          {/* مبلغ نهایی */}
          <FormControl isInvalid={!!errors.amount}>
            <FormLabel>مبلغ نهایی</FormLabel>
            <Input
              {...register("amount")}
              value={formatNumber(watch("amount"))}
              onChange={(e) => {
                const raw = persianToEnglishNumbers(e.target.value).replace(
                  /,/g,
                  ""
                );
                setValue("amount", raw);
              }}
              placeholder="مثلاً 450000"
              bg="amir.secondaryBg"
              inputMode="numeric"
            />
            <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
          </FormControl>

          {/* دکمه ثبت */}
          <Button
            type="submit"
            width="100%"
            bg="amir.primary"
            color="black"
            fontWeight="bold"
            size="lg"
            isLoading={isSubmitting}
            _hover={{ bg: "#ffca3a" }}
          >
            ثبت اوردر
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

const formatNumber = (num: number | string) => {
  if (!num) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
