import {
  FacilityType,
  ICoffeeShopDetail,
} from "@/types/responses/ResponsesTypes";
import { IconFacility } from "@/utils/IconGenerator/IconGenerator";
import { Box, Flex, Grid, Icon, Text, chakra } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import Carousel from "../Carousel/Carousel";

export const CoffeeInfoSection = ({
  coffee,
}: {
  coffee: ICoffeeShopDetail;
}) => {
  return (
    <chakra.div>
      <Carousel images={coffee?.imageUrls!} />

      <chakra.div my="6">
        <Text mb="6" color="amir.common" fontWeight={600} fontSize={"16px"}>
          درباره {coffee.title}
        </Text>
        <Text color="amir.common" fontWeight={400} fontSize={"14px"}>
          {coffee.description}
        </Text>
      </chakra.div>

      <chakra.div my="6">
        <Text mb="4" color="amir.common" fontWeight={600} fontSize={"16px"}>
          منو کافه
        </Text>
        <Box
          border={"1px solid"}
          borderColor={"amir.common"}
          py="3"
          px="4"
          textAlign="center"
          borderRadius="8px"
        >
          <Text
            color="amir.common"
            fontWeight={400}
            fontSize={"14px"}
            as={Link}
            to={coffee.menuUrl}
            target="blank"
          >
            {coffee.menuUrl}
          </Text>
        </Box>
      </chakra.div>

      <chakra.div my="6">
        <Text mb="4" color="amir.common" fontWeight={600} fontSize={"16px"}>
          امکانات کافه
        </Text>
        <Grid templateColumns="repeat(2, 1fr)" gap="4">
          {coffee?.facilities.map(
            (item: { title: string; id: FacilityType }, index) => {
              return (
                <Flex
                  py="1"
                  gap="2"
                  px="4"
                  key={index}
                  borderRadius="16px"
                  border="1px solid"
                  w="100%"
                  alignItems="center"
                  justifyContent="center"
                  borderColor="amir.secondaryVariant"
                >
                  <IconFacility type={item.id || FacilityType.FreeWifi} />
                  <Text color="amir.common" fontWeight={400} fontSize={"14px"}>
                    {item.title}
                  </Text>
                </Flex>
              );
            }
          )}
        </Grid>
      </chakra.div>
    </chakra.div>
  );
};
