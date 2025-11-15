import { EmptyState } from "@/components/Common/EmptyState/EmptyState";
import { ICoffeeShopDetail } from "@/types/responses/ResponsesTypes";
import {
  Box,
  chakra,
  Flex,
  Grid,
  Text
} from "@chakra-ui/react";
import { EventCard } from "../EventCard/EventCard";
import { Loading } from "../Loading/Loading";
import { useGameSection } from "./GameSection.biz";

export const GameSection = (props: { coffee: ICoffeeShopDetail }) => {
  const {
    dates,
    activeDate,
    setActiveDate,
    sanseis,
    activeSans,
    setActiveSans,
    eventList,
    loadingDate,
    loadingEvent,
    loadingSans,
  } = useGameSection(props);
  return (
    <chakra.div>
      <Text fontSize={"16px"} fontWeight={600} color="amir.common">تاریخ‌ها</Text>
      <Flex align="center" overflowX="auto"  my="4">
        {loadingDate ? (
          <Loading />
        ) : !dates.length ? (
          <EmptyState />
        ) : (
          dates?.map((item: any) => {
            return (
              <Box
                py="2"
                px="4"
                key={item.id}
                me="4"
                textAlign="center"
                borderRadius="16px"
                border="1px solid"
                display="flex"
                alignItems="center"
                onClick={() => setActiveDate(item.id)}
                bgColor={
                  activeDate == item.id ? "amir.secondaryBg" : "transparent"
                }
                borderColor={
                  activeDate == item.id ? "amir.common" : "transparent"
                }
              >
                <Text
                  color="amir.common"
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  {item.date}
                </Text>
              </Box>
            );
          })
        )}
      </Flex>

      <Text fontSize={"16px"} fontWeight={600} color="amir.common">سانس‌ها</Text>
      <Flex align="center" overflowX="auto" gap="2" my="4">
        {loadingSans ? (
          <Loading />
        ) : !sanseis.length ? (
          <EmptyState />
        ) : (
          sanseis?.map((item: any) => {
            return (
              <Box
                py="2"
                px="4"
                w={"auto"}
                display="flex"
                alignItems="center"
                key={item.id}
                textAlign="center"
                borderRadius="16px"
                border="1px solid"
                onClick={() => setActiveSans(item.id)}
                bgColor={
                  activeSans == item.id ? "amir.secondaryBg" : "transparent"
                }
                borderColor={
                  activeSans == item.id ? "amir.common" : "transparent"
                }
                color="amir.common"
                fontWeight={400}
                fontSize={"14px"}
              >
                <Text
                  w="90px"
                  color="amir.common"
                  fontWeight={400}
                  fontSize={"14px"}
                >
                  سانس‌ : {item.time}
                </Text>
              </Box>
            );
          })
        )}
      </Flex>

      <Text fontSize={"16px"} fontWeight={600} color="amir.common">بازی‌ها</Text>
      {loadingEvent ? (
        <Loading />
      ) : !eventList.length ? (
        <chakra.div py="6">
          <EmptyState />
        </chakra.div>
      ) : (
        <Grid templateColumns="repeat(2, 1fr)" gap="4" py="6">
          {eventList.map((item) => {
            return <EventCard event={item} />;
          })}
        </Grid>
      )}
    </chakra.div>
  );
};
