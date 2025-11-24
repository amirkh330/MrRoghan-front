import {
  Box,
  Text,
  VStack,
  Flex,
  Icon,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Calendar, Plus, Toolbox, User } from "@phosphor-icons/react";
import { CalendarCheck } from "@phosphor-icons/react/dist/ssr";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MotionBox = motion(Box);

// Mock Data
const customersCount = 120;
const servicesToday = 5;
const servicesWeek = 18;
const overdueCustomers = 2;

const upcomingServices = [
  { name: "علی رضایی", nextService: "۲۵۰۰ کیلومتر بعدی", status: "active" },
  { name: "سعید کاظمی", nextService: "۳۰۰ کیلومتر بعدی", status: "pending" },
  { name: "مریم احمدی", nextService: "۱۰۰۰ کیلومتر بعدی", status: "warning" },
];

export const ShopDashboard = () => {
  return (
    <Box p="4" color="amir.common" minH="0dvh">
      {/* Quick Action */}
      <Button
        as={Link}
        to={"/shop/create-order"}
        w="100%"
        bg="amir.primary"
        color="black"
        mb="6"
        borderRadius="20px"
        size="lg"
      >
        ساخت سرویس جدید
      </Button>

      {/* Summary Cards */}
      <VStack spacing="4" mb="6">
        {/* تعداد مشتریان */}
        <MotionBox
          bgGradient="linear(to-r, #252422, #403D39)"
          w="100%"
          p="5"
          borderRadius="20px"
          shadow="md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Flex align="center">
            <Text fontSize="sm">تعداد مشتریان</Text>
            <Icon as={User} w={6} h={6} mr="3" color="#FFB703" />
          </Flex>
          <Text fontWeight="700" fontSize="2xl">
            {customersCount}
          </Text>
        </MotionBox>

        {/* سرویس امروز */}
        <MotionBox
          bgGradient="linear(to-r, #252422, #403D39)"
          w="100%"
          p="5"
          borderRadius="20px"
          shadow="md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Flex align="center">
            <Text fontSize="sm">سرویس امروز</Text>
            <Icon as={Toolbox} w={6} h={6} mr="3" color="#FFB703" />
          </Flex>
          <Text fontWeight="700" fontSize="2xl">
            {servicesToday}
          </Text>
        </MotionBox>

        {/* سرویس هفته */}
        <MotionBox
          bgGradient="linear(to-r, #252422, #403D39)"
          w="100%"
          p="5"
          borderRadius="20px"
          shadow="md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Flex align="center">
            <Text fontSize="sm">سرویس هفته</Text>
            <Icon as={Calendar} w={6} h={6} mr="3" color="#FFB703" />
          </Flex>
          <Text fontWeight="700" fontSize="2xl">
            {servicesWeek}
          </Text>
        </MotionBox>
      </VStack>

      {/* Upcoming Services */}
      <Text fontWeight="600" mb="2">
        سرویس‌های نزدیک
      </Text>
      <VStack spacing="3">
        {upcomingServices.map((item, idx) => (
          <Box
            key={idx}
            w="100%"
            p="4"
            bg="amir.secondaryBg"
            borderRadius="16px"
            shadow="sm"
            _hover={{ shadow: "md" }}
          >
            <Flex justify="space-between" align="center">
              <VStack align="flex-start" spacing="0">
                <Text fontWeight="600">{item.name}</Text>
                <Text fontSize="sm" color="amir.secondaryVariant">
                  {item.nextService}
                </Text>
              </VStack>
              <Box
                w="12px"
                h="12px"
                borderRadius="full"
                bg={
                  item.status === "active"
                    ? "green.400"
                    : item.status === "pending"
                    ? "orange.400"
                    : "red.400"
                }
              />
            </Flex>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
