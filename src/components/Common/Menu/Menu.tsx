import useAuthStore from "@/store/authStore";
import {
  CloseButton,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { List } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const Menu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuItems = 1 !== 1 ? _CustomerMenu : _ShopMenu;
  return (
    <>
      <Icon as={List} size={18} onClick={onOpen} />
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
              مستر روغن
            </Text>
          </Flex>

          <DrawerBody mx="0" textAlign={"right"}>
            <VStack align="start" spacing={4}>
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Menu;

const _CustomerMenu = [
  { title: "داشبورد", link: "/customer/dashboard" },
  { title: "آمار", link: "/customer/reports" },
  { title: "خروج", link: "/logout" },
];

const _ShopMenu = [
  { title: "داشبورد", link: "/shop/dashboard" },
  { title: "ایجاد رسید", link: "/shop/dashboard" },
  { title: "مشتریان من", link: "/shop/customers" },
  { title: "آمار", link: "/shop/reports" },
  { title: "خروج", link: "/logout" },
];
