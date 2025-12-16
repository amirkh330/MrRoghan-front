import {
  Box,
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  useAddPeriod,
  useDeletePeriod,
  useEditPeriod,
  useGetPeriods,
} from "../query/periodsAPI";

export const AdminPeriod = () => {
  const { data, isFetching: isLoading } = useGetPeriods("");

  return (
    <Box>
      <Flex mb={5} align="center" justify="space-between">
        <Text fontSize="2xl" fontWeight="700">
          مدیریت یادآوری
        </Text>
      </Flex>

      {isLoading ? (
        <Flex justify="center" p={10}>
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Table variant="simple" bg="white" rounded="md" shadow="md">
          <Thead>
            <Tr>
              <Th>شناسه</Th>
              <Th>عنوان</Th>
              <Th>فعال</Th>
              <Th>عملیات</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((period) => (
              <Tr key={period.id}>
                <Td>{period.services?.map((item) => item.title).join(", ")}</Td>
                <Td>{period.retryCount}</Td>
                <Td>{period.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};
