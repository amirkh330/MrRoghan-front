import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import { persianToEnglishNumbers } from "@/utils/convertNumber/ConvertNumber";
import { formatNumber } from "@/utils/Toman/Toman";
import { Trash } from "@phosphor-icons/react";
import { useShopCreateOrder } from "./shopCreateOrder.biz";
import { UsageEnum } from "@/utils/common";

export const ShopCreateOrder = () => {
  const {
    append,
    remove,
    fields,
    instrumentList,
    register,
    isSubmitting,
    handleSubmit,
    watch,
    errors,
    onSubmit,
    setValue,
    vehiclesList,
    isPending,
  } = useShopCreateOrder();

  return (
    <Box bg="amir.mainBg" color="amir.common" px="4" py="6" minH="100dvh">
      <Text fontSize="22px" fontWeight="bold" mb="6" color="amir.primary">
        ساخت سرویس جدید
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="5">
          {/* شماره مشتری */}
          <FormControl isInvalid={!!errors.phoneNumber}>
            <FormLabel>شماره مشتری</FormLabel>
            <Input
              {...register("phoneNumber")}
              maxLength={11}
              onChange={(e) =>
                setValue("phoneNumber", persianToEnglishNumbers(e.target.value))
              }
              placeholder="09123456789"
              bg="amir.secondaryBg"
            />
            <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
          </FormControl>

          {/* نام */}
          <FormControl isInvalid={!!errors.customer_firstName}>
            <FormLabel>نام مشتری (اختیاری)</FormLabel>
            <Input
              {...register("customer_firstName")}
              placeholder="نام"
              bg="amir.secondaryBg"
            />
            <FormErrorMessage>
              {errors.customer_firstName?.message}
            </FormErrorMessage>
          </FormControl>

          {/* نام خانوادگی */}
          <FormControl isInvalid={!!errors.customer_lastName}>
            <FormLabel>نام خانوادگی مشتری (اختیاری)</FormLabel>
            <Input
              {...register("customer_lastName")}
              placeholder="نام خانوادگی"
              bg="amir.secondaryBg"
            />
            <FormErrorMessage>
              {errors.customer_lastName?.message}
            </FormErrorMessage>
          </FormControl>

          {/* نام خودرو */}
          <FormControl isInvalid={!!errors.vehicle}>
            <FormLabel>نام خودرو</FormLabel>
            <Select
              {...register("vehicle")}
              placeholder="انتخاب کنید"
              bg="amir.secondaryBg"
            >
              {vehiclesList?.data?.map((vehicle) => {
                return (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.title} hg
                  </option>
                );
              })}
            </Select>
            <FormErrorMessage>{errors.vehicle?.message}</FormErrorMessage>
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
                const id = Number(e.target.value);
                if (!id) return;

                const item = instrumentList?.data?.find((i) => i.id === id);
                if (!item) return;

                append(item);
              }}
            >
              {instrumentList?.data?.map((instrument) => {
                return (
                  <option key={instrument.id} value={instrument.id}>
                    {instrument.title}
                  </option>
                );
              })}
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
          <FormControl isInvalid={!!errors.currentDistance}>
            <FormLabel>کیلومتر فعلی</FormLabel>
            <InputGroup>
              <InputRightElement pointerEvents="none" mx="2">
                km
              </InputRightElement>
              <Input
                {...register("currentDistance")}
                value={formatNumber(watch("currentDistance"))}
                onChange={(e) => {
                  const raw = persianToEnglishNumbers(e.target.value).replace(
                    /,/g,
                    ""
                  );
                  setValue("currentDistance", raw);
                }}
                placeholder="مثلاً 150000"
                bg="amir.secondaryBg"
                inputMode="numeric"
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.currentDistance?.message}
            </FormErrorMessage>
          </FormControl>

          {/* کیلومتر بعدی */}
          <FormControl isInvalid={!!errors.nextDistance}>
            <FormLabel>کیلومتر بعدی</FormLabel>
            <InputGroup>
              <InputRightElement pointerEvents="none" mx="2">
                km
              </InputRightElement>
              <Input
                {...register("nextDistance")}
                value={formatNumber(watch("nextDistance"))}
                onChange={(e) => {
                  const raw = persianToEnglishNumbers(e.target.value).replace(
                    /,/g,
                    ""
                  );
                  setValue("nextDistance", raw);
                }}
                placeholder="مثلاً 160000"
                bg="amir.secondaryBg"
                inputMode="numeric"
              />
            </InputGroup>
            <FormErrorMessage>{errors.nextDistance?.message}</FormErrorMessage>
          </FormControl>

          {/* میزان استفاده از ماشین */}
          <FormControl isInvalid={!!errors.usage}>
            <FormLabel>میزان استفاده از ماشین</FormLabel>
            <Select
              {...register("usage")}
              placeholder="انتخاب کنید"
              bg="amir.secondaryBg"
            >
              <option value={UsageEnum.SHORT}>کم</option>
              <option value={UsageEnum.MEDIUM}>متوسط</option>
              <option value={UsageEnum.LONG}>زیاد</option>
            </Select>
            <FormErrorMessage>{errors.usage?.message}</FormErrorMessage>
          </FormControl>

          {/* توضیحات */}
          <FormControl>
            <FormLabel>توضیحات برای دفعه بعدی</FormLabel>
            <Textarea
              {...register("description")}
              placeholder="یادداشت..."
              bg="amir.secondaryBg"
              rows={3}
            />
          </FormControl>

          {/* مبلغ نهایی */}
          <FormControl isInvalid={!!errors.price}>
            <FormLabel>مبلغ نهایی</FormLabel>
            <InputGroup>
              <InputRightElement pointerEvents="none" mx="4">
                تومان
              </InputRightElement>
              <Input
                {...register("price")}
                value={formatNumber(watch("price"))}
                onChange={(e) => {
                  const raw = persianToEnglishNumbers(e.target.value).replace(
                    /,/g,
                    ""
                  );
                  setValue("price", raw);
                }}
                placeholder="مثلاً 450000"
                bg="amir.secondaryBg"
                inputMode="numeric"
              />
            </InputGroup>
            <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
          </FormControl>

          {/* دکمه ثبت */}
          <Button
            type="submit"
            width="100%"
            bg="amir.primary"
            color="black"
            fontWeight="bold"
            size="lg"
            isLoading={isPending}
            _hover={{ bg: "#ffca3a" }}
          >
            ثبت اوردر
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
