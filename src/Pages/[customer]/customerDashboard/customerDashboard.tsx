import { formatNumber } from "@/utils/Toman/Toman";
import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
} from "@chakra-ui/react";
import {
  Calendar,
  RoadHorizon,
  Stethoscope,
  Storefront,
  Wrench,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
const MotionBox = motion(Box);

// Mock – اطلاعات سرویس بعدی
const nextServiceInfo = {
  shopName: "تعمیرگاه جنت",
  nextKm: 125000,
  nextDate: "۱۴۰۴/۰۲/۱۲",
  status: "expired", // expired | soon | ok
};

// Mock – API list
const mockHistory = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  date: "۱۴۰۳/۱۰/۲۰",
  km: 118500,
  price: "۲,۴۵۰,۰۰۰ تومان",
  parts: [
    { title: "فیلتر روغن", price: "۱۵۰,۰۰۰" },
    { title: "روغن موتور", price: "۲۵۰,۰۰۰" },
  ],
  note: "روغن در نوبت بعدی حتماً بررسی شود.",
}));

export const CustomerDashboard = () => {
  const [items, setItems] = useState(mockHistory.slice(0, 10));
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  // Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, []);

  const loadMore = () => {
    const newPage = page + 1;
    const newItems = mockHistory.slice(0, newPage * 10);
    setPage(newPage);
    setItems(newItems);
  };

  // استایل وضعیت سرویس بعدی
  const statusColor: any = {
    expired: "red.400",
    soon: "orange.400",
    ok: "green.400",
  };

  const borderColor: any = {
    expired: "red.500",
    soon: "orange.300",
    ok: "amir.secondaryBg",
  };

  return (
    <Box p="4" color="amir.common">
      {/* ------------------- کارت سرویس بعدی ------------------- */}
      <MotionBox
        p="5"
        bg="amir.secondaryBg"
        borderRadius="18px"
        borderWidth="2px"
        borderColor={borderColor[nextServiceInfo.status]}
        shadow="lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {/* عنوان کارت */}
        <HStack justify="space-between" mb="4">
          <Text fontSize="lg" fontWeight="700">
            سرویس بعدی شما
          </Text>

          <Box
            w="14px"
            h="14px"
            borderRadius="full"
            mx="0"
            bg={statusColor[nextServiceInfo.status]}
          />
        </HStack>

        {/* اطلاعات با نظم کامل */}
        <VStack spacing="4" align="stretch" mx="0">
          <HStack spacing="3" mx="0">
            <Box
              w="32px"
              h="32px"
              bg="amir.mainBg"
              borderRadius="10px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mx="0"
            >
              <Icon as={Storefront} color="amir.primary" mx="0" />
            </Box>

            <HStack
              spacing="0"
              align="start"
              mx="0"
              justifyContent={"space-between"}
              w={"full"}
            >
              <Text fontSize="xs" color="amir.secondaryVariant">
                آخرین مغازه
              </Text>
              <Text fontSize="md" fontWeight="600">
                {nextServiceInfo.shopName}
              </Text>
            </HStack>
          </HStack>

          <HStack spacing="3" mx="0">
            <Box
              w="32px"
              h="32px"
              bg="amir.mainBg"
              borderRadius="10px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mx="0"
            >
              <Icon as={RoadHorizon} color="amir.primary" mx="0" />
            </Box>

            <HStack
              spacing="0"
              align="start"
              mx="0"
              justifyContent={"space-between"}
              w={"full"}
            >
              <Text fontSize="xs" color="amir.secondaryVariant">
                کیلومتر مراجعه بعدی
              </Text>
              <Text fontSize="md" fontWeight="600">
                {formatNumber(nextServiceInfo.nextKm)}
              </Text>
            </HStack>
          </HStack>

          <HStack spacing="3" mx="0">
            <Box
              w="32px"
              h="32px"
              bg="amir.mainBg"
              borderRadius="10px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mx="0"
            >
              <Icon as={Calendar} color="amir.primary" mx="0" />
            </Box>

            <HStack
              spacing="0"
              align="start"
              mx="0"
              justifyContent={"space-between"}
              w={"full"}
            >
              <Text fontSize="xs" color="amir.secondaryVariant">
                تاریخ مراجعه بعدی
              </Text>
              <Text fontSize="md" fontWeight="600">
                {nextServiceInfo.nextDate}
              </Text>
            </HStack>
          </HStack>
        </VStack>

        {/* هشدار */}
        {nextServiceInfo.status === "expired" && (
          <Box
            mt="4"
            p="3"
            bg="red.500"
            borderRadius="12px"
            textAlign="center"
            fontWeight="600"
            fontSize="sm"
          >
            ⚠️ زمان سرویس شما گذشته — لطفاً سریع‌تر مراجعه کنید
          </Box>
        )}
      </MotionBox>

      {/* ------------------- عنوان لیست ------------------- */}
      <Text fontWeight="700" fontSize="lg" my="4">
        سوابق سرویس‌ها
      </Text>

      {/* ------------------- لیست با Infinite Scroll ------------------- */}
      <VStack spacing="4">
        {items.map((item) => (
          <MotionBox
            key={item.id}
            p="5"
            bg="amir.secondaryBg"
            borderRadius="16px"
            shadow="md"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            w="100%"
          >
            {/* عنوان */}
            <HStack justify="space-between" mb="2">
              <Text fontWeight="700">سرویس #{item.id}</Text>
              <Text fontSize="sm" color="amir.secondaryVariant">
                {item.date}
              </Text>
            </HStack>

            {/* ردیف کیلومتر + مبلغ */}
            <HStack justify="space-between" mb="3">
              <VStack spacing="0" align="start" mx="0">
                <Text fontSize="xs" color="amir.secondaryVariant">
                  کیلومتر
                </Text>
                <Text fontWeight="600">{item.km}</Text>
              </VStack>

              <VStack spacing="0" align="end" mx="0">
                <Text fontSize="xs" color="amir.secondaryVariant">
                  مبلغ
                </Text>
                <Text fontWeight="600">{item.price}</Text>
              </VStack>
            </HStack>

            {/* آکاردئون */}
            <Accordion >
              <AccordionItem border="none">
                <AccordionButton
                  bg="amir.mainBg"
                  borderRadius="10px"
                  _expanded={{ bg: "amir.mainBg" }}
                  py="2"
                >
                  <Box flex="1" textAlign="left" fontWeight="600">
                    جزئیات
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <Text fontWeight="600" mb="2">
                    قطعات تعویض‌شده:
                  </Text>

                  {item.parts.map((p, idx) => (
                    <HStack key={idx} justify="space-between" mb="1">
                      <Text>{p.title}</Text>
                      <Text color="amir.secondaryVariant">{p.price} تومان</Text>
                    </HStack>
                  ))}

                  <Text mt="3" fontWeight="600">
                    توضیحات:
                  </Text>
                  <Text color="amir.secondaryVariant">{item.note}</Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </MotionBox>
        ))}

        {/* Loader for infinite scroll */}
        <Box ref={loaderRef} py="4">
          <Spinner color="amir.primary" />
        </Box>
      </VStack>
    </Box>
  );
};
