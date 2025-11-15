import BottomSheet from "@/components/CoreComponents/BottomSheet/BottomSheet";
import { Box, Button, Checkbox, Flex, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useCityFilter } from "./CityFilter.biz";
import { useSearchParams } from "react-router-dom";

export const CityFilter = ({ handleFilterChange, districtsList }: any) => {
  const { whereFilterVisible, setWhereFilterVisible } = useCityFilter();

  const toast = useToast();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const districts = searchParams.get("districts");


  useEffect(() => {
    setSelectedItems(districts ? [Number(districts)] : []);
  },[])
  const [selectedItems, setSelectedItems] = useState<number[]>(districts ? [Number(districts)] : []);

  const handleCheckboxChange = (id: number) => {
    if (id === -1) {
      // اگر "همه" کلیک شود
      if (selectedItems.includes(-1)) {
        setSelectedItems([]); // همه را غیرفعال کن
      } else {
        setSelectedItems(districtsList.map((item: any) => item.id));
        // .filter((id) => id !== -1)); // همه را فعال کن
      }
    } else {
      const newSelection = selectedItems.includes(id)
        ? selectedItems.filter((item) => item !== id)
        : [...selectedItems, id];

      setSelectedItems([...newSelection]);
    }
  };

  const isAllChecked = selectedItems.length === districtsList.length;

  const isIndeterminate = selectedItems.includes(-1) && !isAllChecked;

  const handleSelect = () => {
    const params = new URLSearchParams();
    selectedItems.forEach((num) => params.append("districts", String(num)));
    setSearchParams(params);

    // selectedItems.map((item, index) => {
    //   if (item) {
    //     searchParams.set(`city`, String(item));
    //   } else {
    //     searchParams.delete(`city`);
    //   }
    //   setSearchParams(searchParams);
    // });

    setWhereFilterVisible(false);
  };

  return (
    <div>
      <Box {...boxStyles} onClick={() => setWhereFilterVisible(true)}>
        <Text fontSize={"16px"}>کجا بریم؟</Text>
      </Box>
      <BottomSheet
        title={"کجا بازی کنیم؟"}
        isOpen={whereFilterVisible}
        onOpen={() => {}}
        onClose={() => setWhereFilterVisible(false)}
      >
        <Box p="4" m="0" maxH={"65vh"} overflow="auto">
          <Flex m="0" gap="2" alignItems="start" flexDirection="column">
            {districtsList.map((item: any) => (
              <Checkbox
                key={item.id}
                value={item.id}
                isIndeterminate={item.id == -1 ? isIndeterminate : false}
                isChecked={selectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
                sx={{
                  ".chakra-checkbox__control": {
                    borderColor: "amir.primary",
                    _checked: {
                      bg: "amir.primary",
                      borderColor: "amir.primary",
                    },
                    isIndeterminate: {
                      bg: "amir.primary",
                      borderColor: "amir.primary",
                    },
                  },
                }}
                mx="0"
              >
                <Text color="amir.common" fontSize={"16px"} mx="0">
                  {item.title}
                </Text>
              </Checkbox>
            ))}
          </Flex>
        </Box>
        <Box mx="4" py="4">
          <Button
            bgColor="amir.primary"
            color="amir.secondaryBg"
            w="100%"
            isDisabled={selectedItems.length === 0}
            onClick={handleSelect}
          >
            انتخاب
          </Button>
        </Box>
      </BottomSheet>
    </div>
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
