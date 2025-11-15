import { GameMode } from "@/types/responses/ResponsesTypes";
import {
  Box,
  Button,
  Flex,
  Image,
  Text
} from "@chakra-ui/react";
import { useState } from "react";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";
import BottomSheet from "../BottomSheet/BottomSheet";
import { CustomDatePicker } from "../CustomDatePicker/CustomDatePicker";
import { FilterView } from "../FilterView/FilterView";
import { CityFilter } from "./components/cityFilter/CityFilter";
import { useFilterSecession } from "./FilterSecession.biz";

export const FilterSecession = () => {
  const {
    timeFilterVisible,
    setTimeFilterVisible,
    whereFilterVisible,
    setWhereFilterVisible,
    typeFilterVisible,
    districtsList,
    setTypeFilterVisible,
    handleFilterChange,
  } = useFilterSecession();

  return (
    <Box my="1">
      <Flex gap="8" alignItems={"center"} my="4">
        <Box {...boxStyles} onClick={() => setTypeFilterVisible(true)}>
          <Text fontSize={"16px"}>چی بازی؟</Text>
        </Box>
        <Box {...boxStyles} onClick={() => setTimeFilterVisible(true)}>
          <Text fontSize={"16px"}>کِی بریم؟</Text>
        </Box>
        <CityFilter handleFilterChange={handleFilterChange} districtsList={districtsList} />
      </Flex>
      <FilterView districtsList={districtsList}/>
      <TimeFilterModal
        isOpen={timeFilterVisible}
        onClose={() => setTimeFilterVisible(false)}
        handleFilterChange={handleFilterChange}
      />
      <TypeFilterModal
        isOpen={typeFilterVisible}
        onClose={() => setTypeFilterVisible(false)}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  );
};

const boxStyles = {
  w: "92",
  borderRadius: "6px",
  p: "4",
  border: "1px",
  cursor: "pointer",
  color: "amir.common",
  borderColor: "amir.secondaryVariant",
};

const TimeFilterModal = ({
  isOpen,
  onClose,
  handleFilterChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  handleFilterChange: (key: string, value: string) => void;
}) => {
  if (!isOpen) return null;
  const [selectDate, setSelectDate] = useState(new DateObject());

  const handleSetTime = () => {
    selectDate.toString();
    // const time = selectDate
    //   .convert(gregorian, gregorian_en)
    //   .format("YYYY-MM-DDT");
    const time = selectDate.convert(persian, persian_fa).format("YYYY/MM/DD");
    handleFilterChange(
      "date",
      selectDate.convert(gregorian, gregorian_en).format("YYYY-MM-DD")
    );
    onClose();
  };
  
  return (
    <BottomSheet
      title={"کی بازی کنیم؟"}
      isOpen={isOpen}
      onOpen={() => {}}
      onClose={onClose}
    >
      <Box p="4">
        <CustomDatePicker setValue={setSelectDate} value={selectDate} />
        <Button
          w="full"
          p="2"
          bgColor={"amir.primary"}
          borderRadius={"8px"}
          my="4"
          onClick={handleSetTime}
        >
          تائید تاریخ بازی
        </Button>
      </Box>
    </BottomSheet>
  );
};

const TypeFilterModal = ({
  isOpen,
  onClose,
  handleFilterChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  handleFilterChange: (key: string, value: string) => void;
}) => {
  if (!isOpen) return null;
  const handleSetType = (type: string) => {
    handleFilterChange("games", type);
    onClose();
  };
  return (
    <BottomSheet
      title={"چی بازی کنیم؟"}
      isOpen={isOpen}
      onOpen={() => {}}
      onClose={onClose}
    >
      <Flex px="4" pb="4">
        <Box
          p="4"
          mx="2"
          w="full"
          display="flex"
          flexDirection="column"
          alignItems="center"
          bg={"amir.secondaryBg"}
          borderRadius="8px"
          cursor="pointer"
          onClick={() => handleSetType(GameMode.mafia)}
        >
          <Image src="images/mafia.svg" />
          <Text fontSize={"16px"} fontWeight={500} color={"amir.common"}>
            مافیا
          </Text>
        </Box>
        <Box
          p="4"
          mx="2"
          w="full"
          display="flex"
          cursor="pointer"
          borderRadius="8px"
          alignItems="center"
          flexDirection="column"
          bg={"amir.secondaryBg"}
          onClick={() => handleSetType(GameMode.golyapoch)}
        >
          <Image src="images/golyapooch.svg" />
          <Text fontSize={"16px"} fontWeight={500} color={"amir.common"}>
            گل یا پوچ
          </Text>
        </Box>
      </Flex>
    </BottomSheet>
  );
};
