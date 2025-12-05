import { EmptyState } from "@/components/Common/EmptyState/EmptyState";
import { OrderCard } from "@/components/CoreComponents/OrderCard/orderCard";
import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
import { useGetMyOrders } from "../query/getMyOrders";

export const ShopReports = () => {
  const { data, isLoading } = useGetMyOrders();

  return (
    <Box p="4" color="amir.common">
      <Text fontWeight="700" fontSize="lg" my="4">
        سوابق سرویس‌ها
      </Text>

      <VStack spacing="4">
        {isLoading ? (
          <Spinner />
        ) : data?.length ? (
          data.map((item) => <OrderCard key={item.id} item={item} />)
        ) : (
          <EmptyState />
        )}
      </VStack>
    </Box>
  );
};
