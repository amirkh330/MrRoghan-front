import {
  Box,
  Text,
  VStack,
  HStack,
  Tag,
  Flex,
  Select,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { BowlingBall, Toolbox, User } from "@phosphor-icons/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MotionBox = motion(Box);

// Animated Number
const AnimatedNumber = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (!end) return;
    const duration = 800;
    const stepTime = Math.max(Math.floor(duration / end), 1);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <Text fontWeight="700" fontSize="2xl">
      {count}
    </Text>
  );
};

// Mock Data
const topCustomers = [
  { name: "علی رضایی", services: 15 },
  { name: "سعید کاظمی", services: 12 },
  { name: "مریم احمدی", services: 10 },
];

export const ShopReports = () => {
  const [timeRange, setTimeRange] = useState(30);
  const [customersCount, setCustomersCount] = useState(120);
  const [servicesCount, setServicesCount] = useState(35);
  const [chartData, setChartData] = useState<any>({
    labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
    datasets: [
      {
        label: "تعداد سرویس‌ها",
        data: Array.from(
          { length: 30 },
          () => Math.floor(Math.random() * 5) + 1
        ),
        backgroundColor: "#FFB703",
        borderRadius: 4,
      },
    ],
  });

  // تغییر داده‌ها بر اساس Select
  useEffect(() => {
    const days = timeRange;
    setChartData({
      labels: Array.from({ length: days }, (_, i) => `${i + 1}`),
      datasets: [
        {
          label: "تعداد سرویس‌ها",
          data: Array.from(
            { length: days },
            () => Math.floor(Math.random() * 5) + 1
          ),
          backgroundColor: "#FFB703",
          borderRadius: 4,
        },
      ],
    });
  }, [timeRange]);

  return (
    <Box p="4" color="amir.common">
      <Text fontSize="22px" fontWeight="bold" mb="6" color="amir.primary">
        آمار و عملکرد شما
      </Text>
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
          transition={{ duration: 0.4 }}
        >
          <Flex align="center">
            <Text fontSize="sm">تعداد مشتریان</Text>
            <Icon as={User} w={6} h={6} mr="3" color="#FFB703" />
          </Flex>
          <AnimatedNumber value={customersCount} />
        </MotionBox>

        {/* ۳ مشتری برتر */}
        <MotionBox
          bgGradient="linear(to-r, #252422, #403D39)"
          w="100%"
          p="5"
          borderRadius="20px"
          shadow="md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Flex align="center" mb="2">
            <Text fontSize="sm">۳ مشتری برتر</Text>
            <Icon as={BowlingBall} w={6} h={6} mr="3" color="#FFB703" />
          </Flex>
          <VStack align="flex-start" spacing="1">
            {topCustomers.map((c, idx) => (
              <Text key={idx} fontSize="sm">
                {idx + 1}. {c.name} - {c.services} سرویس
              </Text>
            ))}
          </VStack>
        </MotionBox>

        {/* سرویس‌های ۳۰ روز گذشته */}
        <MotionBox
          bgGradient="linear(to-r, #252422, #403D39)"
          w="100%"
          p="5"
          borderRadius="20px"
          shadow="md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Flex align="center">
            <Text fontSize="sm">سرویس‌های {timeRange} روز گذشته</Text>
            <Icon as={Toolbox} w={6} h={6} mr="3" color="#FFB703" />
          </Flex>
          <AnimatedNumber value={servicesCount} />
        </MotionBox>
      </VStack>

      {/* Select بازه زمانی */}
      <Flex mb="3" justify="flex-end">
        <Select
          w="32"
          bg="amir.secondaryBg"
          value={timeRange}
          onChange={(e) => setTimeRange(Number(e.target.value))}
        >
          <option value={7}>۷ روز</option>
          <option value={30}>۳۰ روز</option>
          <option value={90}>۹۰ روز</option>
        </Select>
      </Flex>

      {/* نمودار */}
      <Box bg="amir.secondaryBg" w="100%" p="4" borderRadius="20px" shadow="md">
        <Text mb="2" fontWeight="600" fontSize="sm">
          نمودار سرویس‌ها
        </Text>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
              x: { ticks: { color: "#D9D9D9" }, grid: { display: false } },
              y: { ticks: { color: "#D9D9D9" }, grid: { color: "#403D39" } },
            },
          }}
        />
      </Box>
    </Box>
  );
};
