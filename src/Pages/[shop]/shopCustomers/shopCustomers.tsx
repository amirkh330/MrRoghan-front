import { Box, Input, Text, VStack, HStack, Tag, Flex } from "@chakra-ui/react";
import { Phone } from "@phosphor-icons/react";
import { useState } from "react";

const mockCustomers = [
  {
    id: 1,
    name: "علی رضایی",
    phone: "09121234567",
    lastVisit: "۳ روز قبل",
    nextService: "۲ ماه دیگر",
    vehicle: "پراید",
  },
  {
    id: 2,
    name: "سعید کاظمی",
    phone: "09351234567",
    lastVisit: "۱۰ روز قبل",
    nextService: "۱ ماه دیگر",
    vehicle: "پراید",
  },
];

export const ShopCustomers = () => {
  const [search, setSearch] = useState("");

  const filtered = mockCustomers.filter(
    (c) => c.name.includes(search) || c.phone.includes(search)
  );

  return (
    <Box p="4" color="amir.common">
      {/* Search */}
      <Input
        placeholder="جستجو بر اساس نام یا شماره"
        bg="amir.secondaryBg"
        border="none"
        mb="4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* List */}
      <VStack spacing="4" width="100%">
        {filtered.map((item) => (
          <Box
            key={item.id}
            w="100%"
            gap={4}
            bg="amir.secondaryBg"
            borderRadius="16px"
            py="2"
            px="3"
            mb="2"
            shadow="sm"
            _hover={{ shadow: "md", transform: "scale(1.01)" }}
            transition="all 0.2s"
          >
            {/* هدر کارت: نام + تگ وضعیت */}
            <Flex justifyContent="space-between" align="center" gap={3} mb={2}>
              <Flex align="center" m={0} gap={2}>
                <Text fontWeight="700" fontSize="md" noOfLines={1}>
                  {item.name}
                </Text>
              </Flex>
              <Flex
                as="a"
                href={`tel:${item.phone}`}
                align="center"
                justify="space-between"
                gap={2}
                m={0}
              >
                <Phone color="#FFB703" />
                <Text
                  color="amir.primary"
                  fontWeight="600"
                  fontSize="sm"
                  noOfLines={1}
                >
                  {item.phone}
                </Text>
              </Flex>
            </Flex>

            <Flex justifyContent="space-between" align="center" gap={3} mb={2}>
              <Text fontSize="sm" color="amir.secondaryVariant">
                آخرین مراجعه:{" "}
              </Text>
              <Text color="amir.common">{item.lastVisit}</Text>
            </Flex>

            <Flex justifyContent="space-between" align="center" gap={3} mb={2}>
              <Text fontSize="sm" color="amir.secondaryVariant">
                سرویس بعدی:{" "}
              </Text>
              <Text color="amir.common">{item.nextService}</Text>
            </Flex>

            <Flex justifyContent="space-between" align="center" gap={3} mb={2}>
              <Text fontSize="sm" color="amir.secondaryVariant">
                وسیله نقلیه:{" "}
              </Text>
              <Text color="amir.common">{item.vehicle}</Text>
            </Flex>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
