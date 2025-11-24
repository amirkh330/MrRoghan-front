"use client";

import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Bell, Toolbox, FileDashed as File } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import Logo from "@/images/logo.png";
import { Link } from "react-router-dom";
import { Login } from "@/components/Common/Login/Login";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      width="100%"
      minH="90dvh"
      bg="amir.mainBg"
      color="amir.common"
      px="4"
      pb="8"
    >
      {/* Hero Section */}
      <MotionFlex
        direction="column"
        align="center"
        textAlign="center"
        mt="8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Text fontSize="28px" color="amir.primary">
          سرویس خودرو، ساده‌تر از همیشه
        </Text>
        <Button my="4" w="full" bgColor={"amir.primary"} onClick={onOpen}>
          ورود
        </Button>
        <Text mt="3" fontSize="15px" color="amir.secondaryVariant">
          ثبت و مدیریت سرویس‌های دوره‌ای، تعویض روغن، لاستیک و هر چیزی که خودروت
          نیاز داره. یادآوری‌ها هم به صورت SMS برات ارسال میشه.
        </Text>

        {/* Hero Illustration */}
        <MotionBox
          mt="6"
          width="200px"
          height="180px"
          bg="amir.secondaryBg"
          borderRadius="16px"
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          children={<Image src={Logo} h={"180px"} />}
        />
      </MotionFlex>

      {/* Features Section */}
      <VStack spacing="5" mt="12">
        <FeatureItem
          icon={<Bell size={24} />}
          title="یادآوری سرویس با SMS"
          desc="زمان تعویض روغن یا سرویس دوره‌ای رو فراموش نمی‌کنی."
        />

        <FeatureItem
          icon={<File size={24} />}
          title="کارتکس کامل خودرو"
          desc=" تمام سوابق تعمیرات و سرویس‌ها همیشه همراهت. و هیچی از قلم نمیافته."
        />

        <FeatureItem
          icon={<Toolbox size={24} />}
          title="ویژه مشتری و مغازه‌دار"
          desc="هر دو سمت، هم مدیریت راحت و هم سابقه قابل مشاهده."
        />
      </VStack>

      {/* CTA Button */}
      <MotionBox
        mt="12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          width="100%"
          bg="amir.primary"
          color="black"
          fontWeight="bold"
          size="lg"
          _hover={{ bg: "#ffca3a" }}
          as={Link}
          to={"/register"}
        >
          ثبت نام به عنوان مغازه‌دار
        </Button>
      </MotionBox>
      {isOpen && <Login isOpen={isOpen} onOpen={onOpen} onClose={onClose} />}
    </Box>
  );
}

function FeatureItem({
  icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <MotionFlex
      width="100%"
      bg="amir.secondaryBg"
      borderRadius="12px"
      p="4"
      align="center"
      gap="3"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box color="amir.primary">{icon}</Box>
      <Box>
        <Text fontWeight="600" color="amir.common">
          {title}
        </Text>
        <Text fontSize="13px" color="amir.secondaryVariant">
          {desc}
        </Text>
      </Box>
    </MotionFlex>
  );
}
