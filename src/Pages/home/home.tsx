import { Login } from "@/components/Common/Login/Login";
import Carousel from "@/components/CoreComponents/Carousel/Carousel";
import Logo from "@/images/logo.png";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Bell, File, Toolbox } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import intro from "public/images/intro.png";
import c1 from "public/images/co-1.png";
import c2 from "public/images/co-2.png";
import c3 from "public/images/co-3.png";
import useAuthStore from "@/store/authStore";
import { Navigate } from "react-router-dom";
import { RoleEnum } from "@/utils/common";
import { RouteConst } from "@/utils/allRoutes.type";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuth, role } = useAuthStore();
  if (isAuth) {
    return (
      <Navigate
        to={`/${
          role == RoleEnum.SHOP
            ? RouteConst.shopDashboard
            : RouteConst.customerDashboard
        }`}
      />
    );
  }

  return (
    <Box width="100%" minH="80dvh" bg="amir.mainBg" color="amir.common">
      {/* HERO */}
      <MotionFlex
        direction="column"
        align="center"
        textAlign="center"
        px="6"
        mt="2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Image src={intro} h="250px" />

        <Text fontSize="24px" fontWeight="700" mt="2" color="amir.common">
          مدیریت هوشمند سرویس خودرو
        </Text>
      </MotionFlex>

      <Box mx="4" mt="6">
        <Carousel
          items={[
            <FeatureCard
              icon={<Bell size={28} />}
              title="سرویس خودرو، بدون فراموشی"
              desc="تمام سرویس‌ها ثبت می‌شوند و زمان رسیدگی همیشه به‌موقع یادآوری می‌شود."
            />,
            <FeatureCard
              icon={<File size={28} />}
              title="هر خودرو، یک پرونده دقیق"
              desc="سوابق سرویس هر خودرو به‌صورت جداگانه و منظم نگه‌داری می‌شود."
            />,
            <FeatureCard
              icon={<Toolbox size={28} />}
              title="خدمات حرفه‌ای‌تر دیده میشه"
              desc="ثبت سیستمی سرویس‌ها، اعتماد مشتری رو بالا می‌بره."
            />,
          ]}
        />
      </Box>

      <MotionFlex
        mt="auto"
        py={3}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button
          mx="4"
          px="3"
          py="6"
          w="90%"
          color={"white"}
          border={"1px solid"}
          bgColor={"amir.accent"}
          onClick={() => onOpen()}
          borderColor={"amir.primary"}
        >
          ثبت نام / ورود
        </Button>
      </MotionFlex>
      {isOpen && <Login isOpen={isOpen} onOpen={onOpen} onClose={onClose} />}
    </Box>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <MotionBox
      bg="amir.secondaryBg"
      borderRadius="22px"
      w="100%"
      py="5"
      px="3"
      border="1px solid"
      borderColor="amir.secondaryVariant"
      whileTap={{ scale: 0.98 }}
    >
      <HStack justify="flex-start" align="center">
        <Box color="amir.common">{icon}</Box>
        <VStack alignItems={"start"} w="80%" flexWrap={"nowrap"}>
          <Text fontWeight="700" fontSize="17px" color="amir.common">
            {title}
          </Text>
          <Text fontSize="14px" mt="1" color="amir.secondary">
            {desc}
          </Text>
        </VStack>
      </HStack>
    </MotionBox>
  );
}
