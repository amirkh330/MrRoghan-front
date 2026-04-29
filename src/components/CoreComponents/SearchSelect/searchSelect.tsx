import {
  Box,
  Input,
  Spinner,
  VStack,
  Text,
  useOutsideClick,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { useState, useRef, useCallback } from "react";
import debounce from "lodash.debounce";
import { ReminderDateEnum } from "@/utils/common";
import { BellRinging } from "@phosphor-icons/react";

interface ISearchSelect {
  value: any[];
  options: any[];
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: (search: string) => void;
  onSelect: (item: any) => void;
  onRemove: (item: any) => void;
  handleReminder: (field: {
    title: string;
    serviceId: string;
    reminder?: ReminderDateEnum | undefined;
  }) => void;
  loading?: boolean;
  placeholder?: string;
}

export const SearchSelect = ({
  value,
  options,
  searchValue,
  onSearchChange,
  onSearch,
  onSelect,
  onRemove,
  handleReminder,
  loading = false,
  placeholder = "جستجو...",
}: ISearchSelect) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: () => setOpen(false),
  });

  const debouncedSearch = useCallback(
    debounce((val: string) => {
      onSearch(val);
    }, 400),
    [],
  );

  const handleInput = (val: string) => {
    onSearchChange(val);
    debouncedSearch(val);
    setOpen(true);
  };

  const isSelected = (id: number) =>
    value.some((item) => item.id === id || item.serviceId === id);

  return (
    <Box ref={ref} pos="relative" w="100%">
      <Wrap mb={2}>
        {value.map((item) => (
          <Tag key={item.serviceId || item.id} borderRadius="full">
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <TagLabel>{item.title}</TagLabel>
              <Flex alignItems={"center"}>
                <IconButton
                  aria-label="notification"
                  m={0}
                  icon={
                    <BellRinging
                      fill={item.reminder ? "#2bb15cff" : "black"}
                      weight={item.reminder ? "fill" : "bold"}
                    />
                  }
                  size="sm"
                  onClick={() => handleReminder(item as any)}
                />
                <TagCloseButton onClick={() => onRemove(item)} m={0} />
              </Flex>
            </Flex>
          </Tag>
        ))}
      </Wrap>

      <Input
        placeholder={placeholder}
        bg="amir.secondaryBg"
        mb="3"
        value={searchValue}
        onChange={(e) => handleInput(e.target.value)}
        onFocus={() => setOpen(true)}
      />

      {open && (
        <Box
          mt={1}
          pos="absolute"
          w="100%"
          bg="amir.secondaryBg"
          borderRadius="8px"
          border="1px solid #444"
          maxH="200px"
          overflowY="auto"
          zIndex={999}
        >
          {loading ? (
            <Box p={3} textAlign="center">
              <Spinner size="sm" />
            </Box>
          ) : options.length === 0 ? (
            <Box p={3}>
              <Text fontSize="14px" color="gray.400">
                نتیجه‌ای یافت نشد
              </Text>
            </Box>
          ) : (
            <VStack align="stretch" spacing={0}>
              {options.map((item) => {
                const selected = isSelected(item.id);

                return (
                  <Box
                    key={item.id}
                    px={3}
                    py={2}
                    bg={selected ? "blue.600" : "transparent"}
                    _hover={{ bg: "gray.600" }}
                    cursor="pointer"
                    onClick={() => onSelect(item)}
                  >
                    {item.title}
                  </Box>
                );
              })}
            </VStack>
          )}
        </Box>
      )}
    </Box>
  );
};
