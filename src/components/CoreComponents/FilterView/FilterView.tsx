import { CloseButton, Flex, Tag } from "@chakra-ui/react";
import React, { useState } from "react";
import { DateObject } from "react-multi-date-picker";
import { useSearchParams } from "react-router-dom";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export const FilterView = ({ districtsList }: any) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const list = Array.from(searchParams.entries()).map(([key, value]) => {
    return { type: key, value }; // Assuming the key represents the type
  });

  const removeFilter = (key: string) => {
    searchParams.delete(key);
    setSearchParams(searchParams);
  };

  const renderItem = (item: { type: string; value: string }) => {
    switch (item.type) {
      case "date":
        return new DateObject(item.value)
          .convert(persian, persian_fa)
          .toString();
      case "games":
        return item.value == "mafia" ? "مافیا" : "گل یا پوچ";

      default:
        return districtsList?.find((district: any) => district.id == item.value)
          ?.title;
      // return districtsList?.find((district: any) => district._id == item.value)
      //   .title;
    }
  };

  return (
    <Flex my="2" justifyContent={"flex-start"} gap={2} overflowX={"auto"}>
      {list.map((item) => {
        if (!item) return null;
        return (
          <Tag
            minW={"auto"}
            key={item.type}
            borderRadius={"6px"}
            gap="8px"
            py="1"
            mx="0"
            px="12px"
            bgColor={"amir.primary"}
            color={"amir.mainBg"}
            fontSize={"16px"}
          >
            {renderItem(item)}
            <CloseButton
              fontSize="10px"
              onClick={() => removeFilter(item.type)}
            />
          </Tag>
        );
      })}
    </Flex>
  );
};
