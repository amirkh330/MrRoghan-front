import { CallApi } from "@/settings/axiosConfig";
import { Box, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import useAuthStore from "@/store/authStore";
import { log } from "node:console";
import { Login } from "../Login/Login";

export const Layout = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const navigate = useNavigate();
  // const toast = useToast();

  return (
    <Box maxWidth="400px" width="100%" bg="amir.mainBg" height="100dvh">
      <Header />
      <Outlet />
      {/* {isOpen && <Login isOpen={isOpen} onOpen={onOpen} onClose={onClose} />} */}
    </Box>
  );
};
