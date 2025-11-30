import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  FormControl,
  FormLabel,
  Text,
  useToast,
  Icon,
  chakra,
} from "@chakra-ui/react";
import { Lock, User } from "@phosphor-icons/react";

export const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = () => {
    if (!username || !password) {
      return toast({
        title: "خطا",
        description: "لطفاً تمام فیلدها را پر کنید",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    toast({
      title: "ورود موفق",
      description: `${username} عزیز خوش آمدید!`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Flex
      minH="100vh"
      bgGradient="linear(to-br, teal.400, blue.600)"
      align="center"
      justify="center"
      p={4}
    >
      <Box
        bg="white"
        p={10}
        rounded="2xl"
        shadow="2xl"
        w={{ base: "90%", sm: "400px" }}
        textAlign="center"
      >
        <Heading
          mb={6}
          bgGradient="linear(to-r, teal.500, blue.600)"
          bgClip="text"
        >
          ورود به پنل مدیریت
        </Heading>

        <Stack spacing={5}>
          <FormControl>
            <FormLabel textAlign="right">نام کاربری</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={User} color="gray.400" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="نام کاربری"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel textAlign="right">رمز عبور</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={Lock} color="gray.400" />
              </InputLeftElement>
              <Input
                type="password"
                placeholder="رمز عبور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <Button
            colorScheme="teal"
            size="lg"
            w="100%"
            rounded="full"
            onClick={handleLogin}
          >
            ورود
          </Button>
        </Stack>

        <Text fontSize="sm" mt={6} color="gray.500">
          © 2025 Admin Panel — ساخته شده با عشق ❤
        </Text>
      </Box>
    </Flex>
  );
};
