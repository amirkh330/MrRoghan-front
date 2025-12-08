import { EmptyState } from "@/components/Common/EmptyState/EmptyState";
import CustomSelect from "@/components/CoreComponents/CustomSelect/customSelect";
import { ShopOrderCard } from "@/components/CoreComponents/ShopOrderCard/ShopOrderCard";
import { Box, Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGetMyCustomers } from "../query/getCustomers";
import { useGetMyOrders } from "../query/getMyOrders";
import { useSearchParams } from "react-router-dom";

export const ShopReports = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any>(null);

  const [searchParams] = useSearchParams(window.location.href);
  const customerId = searchParams.get("customerId");
  const customerName = searchParams.get("customer");

  useEffect(() => {
    if (customerId) {
      setSelected({
        value: Number(customerId),
        label: customerName,
      });
    }
  }, []);

  const { data, isLoading } = useGetMyOrders(selected?.value);
  const { data: myCustomer, isLoading: loadingMyCustomer } =
    useGetMyCustomers("");

  return (
    <Box p="4" color="amir.common" pt="0">
      <Flex align="center" justifyContent="space-between" py="4">
        <Text fontWeight="700" fontSize="lg">
          سوابق سرویس‌ها
        </Text>
      </Flex>
      <Box pb="4">
        <CustomSelect
          search={search}
          setSearch={setSearch}
          onChange={setSelected}
          isMulti={false}
          value={selected}
          options={
            myCustomer?.map((item) => ({
              value: item.id,
              label: item.firstName + " " + item.lastName,
            })) ?? []
          }
          loading={loadingMyCustomer}
        />
      </Box>

      <VStack spacing="4">
        {isLoading ? (
          <Spinner />
        ) : data?.length ? (
          data.map((item) => <ShopOrderCard key={item.id} item={item} />)
        ) : (
          <EmptyState />
        )}
      </VStack>
    </Box>
  );
};
