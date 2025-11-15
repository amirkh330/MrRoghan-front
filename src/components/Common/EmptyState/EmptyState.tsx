import { Image, Text, chakra } from "@chakra-ui/react";
import { Ghost } from "@phosphor-icons/react/dist/ssr";
import React from "react";

export const EmptyState = () => {
  return (
    <chakra.div mx="auto" textAlign="center" my="4">
      <Image mb="2" as={Ghost} weight="fill" color="#E7E7E7" size={"48px"} />
      <Text fontSize={"14px"} fontWeight={400} color="#E7E7E7">
        empty result
      </Text>
    </chakra.div>
  );
};
