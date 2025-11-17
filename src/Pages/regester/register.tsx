import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useRegister } from "./register.biz";
import { persianToEnglishNumbers } from "@/utils/convertNumber/ConvertNumber";

export const Register = () => {
  const { handleSubmit, register, errors, isSubmitting, onSubmit, setValue } =
    useRegister();
  return (
    <Box
      width="100%"
      minH="100dvh"
      bg="amir.mainBg"
      color="amir.common"
      px="4"
      py="6"
    >
      <Text fontSize="22px" fontWeight="bold" mb="6" color="amir.primary">
        ثبت‌نام مغازه‌دار
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="5">
          {/* نام */}
          <FormControl isInvalid={!!errors.firstName}>
            <FormLabel>نام</FormLabel>
            <Input
              {...register("firstName")}
              placeholder="نام"
              bg="amir.secondaryBg"
              border="1px solid #555"
            />
            <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
          </FormControl>

          {/* نام خانوادگی */}
          <FormControl isInvalid={!!errors.lastName}>
            <FormLabel>نام خانوادگی</FormLabel>
            <Input
              {...register("lastName")}
              placeholder="نام خانوادگی"
              bg="amir.secondaryBg"
              border="1px solid #555"
            />
            <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
          </FormControl>

          {/* تلفن */}
          <FormControl isInvalid={!!errors.phone}>
            <FormLabel>شماره تلفن</FormLabel>
            <Input
              {...register("phone")}
              onChange={(e) =>
                setValue("phone", persianToEnglishNumbers(e.target.value))
              }
              placeholder="مثلاً 09123456789"
              bg="amir.secondaryBg"
              border="1px solid #555"
              inputMode="numeric"
            />
            <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
          </FormControl>

          {/* اسم مغازه */}
          <FormControl isInvalid={!!errors.shopName}>
            <FormLabel>اسم مغازه</FormLabel>
            <Input
              {...register("shopName")}
              placeholder="اسم مغازه"
              bg="amir.secondaryBg"
              border="1px solid #555"
            />
            <FormErrorMessage>{errors.shopName?.message}</FormErrorMessage>
          </FormControl>

          {/* آدرس مغازه */}
          <FormControl isInvalid={!!errors.shopAddress}>
            <FormLabel>آدرس مغازه</FormLabel>
            <Input
              {...register("shopAddress")}
              placeholder="آدرس کامل مغازه"
              bg="amir.secondaryBg"
              border="1px solid #555"
            />
            <FormErrorMessage>{errors.shopAddress?.message}</FormErrorMessage>
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
            ثبت‌نام
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
