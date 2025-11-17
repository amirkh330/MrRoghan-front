import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";

export const Layout = () => {


  return (
    <Box maxWidth="400px" width="100%" bg="amir.mainBg" height="100dvh">
      <Header />
      <Outlet />
    </Box>
  );
};
