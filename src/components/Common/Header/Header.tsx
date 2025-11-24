import useAuthStore from "@/store/authStore";
import { Box, Flex, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { Login } from "../Login/Login";
import Menu from "../Menu/Menu";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuth, logout, fullName } = useAuthStore();
  const toast = useToast();
  const handleLogout = () => {
    logout();
    toast({
      title: "log out successfully",
      status: "success",
      position: "top",
    });
  };

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      bg="amir.secondaryBg"
      color="amir.common"
      p={4}
    >
      <Flex m="0" alignItems="center" gap="2">
        <Menu />
        {isAuth && (
          <Box>
            <Text fontSize="sm">{fullName}</Text>
          </Box>
        )}
      </Flex>
      <Text>مستر روغن</Text>

      {/* <Login isOpen={isOpen} onOpen={onOpen} onClose={onClose} /> */}
    </Flex>
  );
};
