import { RouteConst } from "@/utils/allRoutes.type";
import {
  Badge,
  Box,
  CloseButton,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { List } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Login } from "../Login/Login";
import useMenu from "./Menu.biz";
import { RoleEnum } from "@/utils/common";

const Menu = () => {
  const {
    isAuth,
    fullName,
    shopName,
    phoneNumber,
    menuItems,
    isOpen,
    onOpen,
    onClose,
    loginIsOpen,
    loginOnOpen,
    loginOnClose,
    navigate,
    logout,
    messageCount,
    role,
  } = useMenu();
  return (
    <>
      <Icon as={List} width={"25px"} h={"25px"} onClick={onOpen} />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bgColor="amir.mainBg" color="amir.common">
          <Flex
            p="4"
            mx="0"
            alignItems="center"
            gap="2"
            justifyContent="space-between"
          >
            {/* <DrawerCloseButton /> */}
            <Icon mx="0" as={CloseButton} onClick={onClose} />
            <Text fontSize={"18px"} fontWeight={600}>
              اتوپین
            </Text>
          </Flex>

          <DrawerBody mx="0" textAlign={"right"}>
            {isAuth ? (
              <VStack align="start" spacing={4}>
                <Box
                  w="100%"
                  mx="auto"
                  p="4"
                  borderRadius="16px"
                  bg="amir.secondaryBg"
                  position="relative"
                  boxShadow="0 8px 24px rgba(0, 0, 0, 0.08)"
                  _before={{
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    borderRadius: "16px",
                    padding: "2px",
                    background: "linear-gradient(135deg, #3fbd6d, #6ee7b7)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                >
                  <VStack spacing="2" align="stretch">
                    {/* Full Name */}
                    <Flex justify="space-between" align="center">
                      <Text fontSize="13px" fontWeight="600" color="gray.500">
                        نام و نام خانوادگی
                      </Text>
                      <Text fontSize="14px" fontWeight="700">
                        {fullName}
                      </Text>
                    </Flex>

                    <Divider opacity={0.3} />

                    {/* Phone / Shop */}
                    <Flex justify="space-between" align="center">
                      <Text fontSize="13px" fontWeight="600" color="gray.500">
                        شماره تلفن
                      </Text>
                      <Text fontSize="14px" fontWeight="500">
                        {shopName ?? phoneNumber}
                      </Text>
                    </Flex>

                    <Divider opacity={0.3} />

                    {/* Message Count */}
                    {role === RoleEnum.SHOP && (
                      <Flex justify="space-between" align="center">
                        <Text fontSize="13px" fontWeight="600" color="gray.500">
                          تعداد پیامک‌های شما
                        </Text>

                        <Text fontSize="14px" fontWeight="500">
                          {messageCount}
                        </Text>
                      </Flex>
                    )}
                  </VStack>
                </Box>

                {/* <Divider borderColor={"amir.primary"} /> */}

                {menuItems?.map((item) => (
                  <Link
                    key={item.title}
                    to={item.link}
                    onClick={onClose}
                    style={{
                      fontSize: "14px",
                      margin: "0 24px",
                      justifyContent: "start",
                    }}
                  >
                    {item.title}
                  </Link>
                ))}
                <Text
                  mx="24px"
                  fontSize="14px"
                  onClick={() => {
                    logout();
                    onClose();
                    navigate("/");
                  }}
                >
                  خروج
                </Text>
              </VStack>
            ) : (
              <VStack align="start" spacing={4}>
                <Box
                  p="2"
                  m="2"
                  w="100%"
                  mx="auto"
                  fontSize="14px"
                  textAlign="center"
                  borderRadius="8px"
                  bgColor="amir.secondaryBg"
                  onClick={() => {
                    loginOnOpen();
                    onClose();
                  }}
                >
                  ورود
                </Box>
                <Divider borderColor={"amir.primary"} />

                {menuItems?.map((item) => (
                  <Link
                    key={item.title}
                    to={item.link}
                    onClick={onClose}
                    style={{ fontSize: "14px" }}
                  >
                    {item.title}
                  </Link>
                ))}
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Login isOpen={loginIsOpen} onOpen={loginOnOpen} onClose={loginOnClose} />
    </>
  );
};

export default Menu;

const _CustomerMenu = [
  { title: "داشبورد", link: RouteConst.customerDashboard },
  { title: "سوابق سفارش", link: RouteConst.customerReports },
];

const _ShopMenu = [
  { title: "آمار", link: RouteConst.shopReports },
  { title: "خدمات ما", link: RouteConst.services },
  { title: "داشبورد", link: RouteConst.shopDashboard },
  { title: "مشتریان من", link: RouteConst.shopCustomers },
  { title: "ایجاد سرویس", link: RouteConst.shopCreateOrder },
];

const _PublicMenu = [{ title: "تماس با ما", link: RouteConst.contactUs }];
