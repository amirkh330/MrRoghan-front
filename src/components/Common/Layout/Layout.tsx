import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

export const Layout = () => {
  return (
    <Flex
      direction="column"
      maxWidth="400px"
      width="100%"
      bg="amir.mainBg"
      height="100dvh"
    >
      <Header />
      <Box flex="1" overflow="auto">
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
};
