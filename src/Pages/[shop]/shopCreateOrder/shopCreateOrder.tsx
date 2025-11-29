import {
  Box,
  Button,
  Flex,
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
  Spacer,
  Switch,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import { persianToEnglishNumbers } from "@/utils/convertNumber/ConvertNumber";
import { formatNumber } from "@/utils/Toman/Toman";
import { Trash, TrashSimple } from "@phosphor-icons/react";
import { useShopCreateOrder } from "./shopCreateOrder.biz";
import { UsageEnum } from "@/utils/common";
import BottomSheet from "@/components/CoreComponents/BottomSheet/BottomSheet";
import { useState } from "react";

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
    isOpen,
    onOpen,
    onClose,
    phoneNumber,
    setPhoneNumber,
    handleSelectPhoneNumber,
    isOpenPhoneNumber,
    onOpenPhoneNumber,
    onClosePhoneNumber,
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
        <BottomSheetReminder
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        />
      </form>
      <BottomSheetPhoneNumber
        onOpen={onOpenPhoneNumber}
        isOpen={isOpenPhoneNumber}
        setPhoneNumber={setPhoneNumber}
        phoneNumber={phoneNumber}
        isPending={isPending}
        handleSelectPhoneNumber={handleSelectPhoneNumber}
      />
    </Box>
  );
};

const BottomSheetPhoneNumber = ({
  onOpen,
  isOpen,
  setPhoneNumber,
  phoneNumber,
  isPending,
  handleSelectPhoneNumber,
}: any) => {
  return (
    <BottomSheet
      onOpen={onOpen}
      isOpen={isOpen}
      onClose={() => {}}
      showCloseButton={false}
      title="انتخاب شماره مشتری"
    >
      <Box
        // color="amir.mainBg"
        p="4"
        display="flex"
        flexDirection="column"
        gap={"18px"}
      >
        <Flex mt="4" mx="0" flexDirection={"column"} gap="12px">
          <Text color={"amir.common"} textAlign={"start"} fontSize={"16px"}>
            لطفا شماره موبایل مشتری را وارد کنید
          </Text>
          <Text color={"amir.common"} textAlign={"start"} fontSize={"12px"}>
            مثال : ۰۹۱۲۳۴۵۶۷۸۹
          </Text>
        </Flex>
        <Input
          maxLength={11}
          onChange={(e) =>
            setPhoneNumber(persianToEnglishNumbers(e.target.value))
          }
          value={phoneNumber}
          placeholder="09123456789"
          bg="amir.secondaryBg"
        />
        <Button
          bg="amir.primary"
          color={"white"}
          disabled={isPending || !/^09\d{9}$/.test(phoneNumber)}
          onClick={handleSelectPhoneNumber}
        >
          ایجاد سرویس
        </Button>
      </Box>
    </BottomSheet>
  );
};

const REMINDER_TYPES = [
  "تعویض سرویس دوره ای",
  "تعویض قطعات مصرفی",
  "تعویض قطعات اصلی",
];

const months = Array.from({ length: 6 }, (_, i) => i + 1);

export default function BottomSheetReminder({ onOpen, isOpen, onClose }: any) {
  const [needReminder, setNeedReminder] = useState(false);
  const [reminders, setReminders] = useState<
    { type: string; period: number }[]
  >([]);

  // local fields for the "add new" row
  const [newType, setNewType] = useState("");
  const [newPeriod, setNewPeriod] = useState<number | "">("");

  const addReminder = () => {
    if (!newType || !newPeriod) return; // require both
    if (reminders.length >= 3) return;
    setReminders((r) => [...r, { type: newType, period: Number(newPeriod) }]);
    setNewType("");
    setNewPeriod("");
  };

  const deleteReminder = (index: number) => {
    setReminders((r) => r.filter((_, i) => i !== index));
  };

  return (
    <BottomSheet
      onOpen={onOpen}
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      title="یادآوری"
    >
      <Box p="4" display="flex" flexDirection="column" gap="18px">
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">
            آیا برای این سرویس نیاز به یادآوری دارید؟
          </FormLabel>
          <Switch
            isChecked={needReminder}
            onChange={(e) => setNeedReminder(e.target.checked)}
          />
        </FormControl>

        {needReminder && (
          <>
            {/* add new reminder row */}
            <Flex gap="10px" alignItems="center">
              <Select
                placeholder="نوع یادآوری را انتخاب کنید"
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
              >
                {REMINDER_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>

              <Select
                placeholder="دوره زمانی (ماه)"
                value={newPeriod as any}
                onChange={(e) =>
                  setNewPeriod(e.target.value ? Number(e.target.value) : "")
                }
              >
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m} ماه
                  </option>
                ))}
              </Select>

              <Button
                bg="amir.primary"
                color="white"
                onClick={addReminder}
                isDisabled={!newType || !newPeriod || reminders.length >= 3}
              >
                افزودن
              </Button>
            </Flex>

            {/* list of reminders (one row each) */}
            <Box display="flex" flexDirection="column" gap="8px">
              {reminders.map((item, index) => (
                <Flex
                  key={index}
                  p="3"
                  borderWidth="1px"
                  borderRadius="md"
                  alignItems="center"
                  gap="4"
                >
                  <Text flexBasis="60%">{item.type}</Text>
                  <Text>{item.period} ماه</Text>
                  <Spacer />
                  <IconButton
                    aria-label="حذف"
                    icon={<TrashSimple />}
                    size="sm"
                    onClick={() => deleteReminder(index)}
                  />
                </Flex>
              ))}
            </Box>

            {/* show message when max reached */}
            {reminders.length >= 3 && (
              <Text color="gray.500" fontSize="sm">
                حداکثر ۳ یادآوری مجاز است
              </Text>
            )}
          </>
        )}

        <Button
          bg="amir.primary"
          color="white"
          onClick={() => onClose(reminders)}
        >
          ذخیره
        </Button>
      </Box>
    </BottomSheet>
  );
}
