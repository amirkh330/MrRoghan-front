import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { AdminLayout } from "@/Pages/[admin]/adminLayout/adminLayout";

export const Layout = () => {
  return (
    <Flex
      direction="column"
      width="100%"
      maxWidth="400px"
      bg="amir.mainBg"
      height="100dvh"
      className="mobile-layout"
    >
      <Header />
      <Box flex="1" overflow="auto" w={"full"}>
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
};
