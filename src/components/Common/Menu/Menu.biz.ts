import useAuthStore from "@/store/authStore";
import { RouteConst } from "@/utils/allRoutes.type";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useGetMessageCount } from "./query/menu.query";

const useMenu = () => {
  const navigate = useNavigate();
  const { isAuth, logout, role, fullName, shopName, phoneNumber } =
    useAuthStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: loginIsOpen,
    onOpen: loginOnOpen,
    onClose: loginOnClose,
  } = useDisclosure();

  const { data, isFetching } = useGetMessageCount({ isShop: role === "shop" });

  const menuItems = isAuth
    ? role === "customer"
      ? [..._CustomerMenu, ..._PublicMenu]
      : [..._ShopMenu, ..._PublicMenu]
    : _PublicMenu;

  return {
    menuItems,
    isAuth,
    role,
    fullName,
    shopName,
    phoneNumber,
    isOpen,
    onOpen,
    onClose,
    loginIsOpen,
    loginOnOpen,
    loginOnClose,
    navigate,
    logout,
    messageCount: data?.messageCount,
  };
};

export default useMenu;

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
