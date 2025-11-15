import { ICoffeeShopListItem } from "@/types/responses/ResponsesTypes";
import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { MapPin, Star } from "@phosphor-icons/react/dist/ssr";
import { Link } from "react-router-dom";
export const CoffeeCard = ({ coffee }: { coffee: ICoffeeShopListItem }) => {
  return (
    <Flex
      mx="0"
      my="4"
      p="4px"
      gap="8px"
      as={Link}
      to={`/coffees/${coffee.id}`}
      borderRadius="4px"
      bgColor="amir.secondaryBg"
    >
      <Image
        mx="0"
        borderRadius="4px"
        src={coffee.logoUrl}
        w="80px"
        h="80px"
        objectFit="cover"
      />
      <Box mx="0">
        <Text fontSize={"14px"} color="amir.common" fontWeight={400}>
          {coffee.title}
        </Text>
        <Flex gap="1" align={"center"} my="2" color="amir.secondary">
          <Icon mx="0" as={Star} />
          <Text fontSize={"12px"} fontWeight={400} mx="0">
            {coffee.rate}
          </Text>
        </Flex>

        <Flex gap="1" align={"center"} color="amir.secondary">
          <Icon textAlign="center" mx="0" as={MapPin} />
          <Text fontSize={"12px"} fontWeight={400} mx="0">
            {coffee.address}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};
