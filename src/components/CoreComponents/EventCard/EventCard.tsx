import { IEventItem } from "@/types/responses/ResponsesTypes";
import { IsShowDiscount } from "@/utils/IsShowDiscount/IsShowDiscount";
import { Toman } from "@/utils/Toman/Toman";
import { Box, Card, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { Calendar } from "@phosphor-icons/react";
import { MapPin, Users } from "@phosphor-icons/react/dist/ssr";
import { Link } from "react-router-dom";

// export const EventCard = ({ event }: { event: IEventItem }) => {
export const EventCard = ({ event }: { event: any }) => {
  const date = new Date(event.datetime);
  const cardDate = date.toLocaleDateString();
  const cardTime = date.toLocaleTimeString();
  return (
    <Card
      as={Link}
      mx="6px"
      my="12px"
      overflow="hidden"
      borderRadius="4px"
      color="amir.common"
      bg="amir.secondaryBg"
      to={`/event/${event.id}`}
    >
      <Flex mx="0">
        <Box mx="0">
          <Image h="100px" src={event.event_attachments[0]?.attachment} />
          {/* {allowShowHost && (
          <Box
            borderRadius="50%"
            w="40px"
            h="40px"
            overflow={"hidden"}
            mx="0"
            position="relative"
            top="-30px"
            right="10px"
          >
            <Image
              src={event.host.logoUrl}
              w="40px"
              h="40px"
              objectFit={"cover"}
              overflow={"hidden"}
              mx="0"
            />
          </Box>
        )} */}
        </Box>
        <Box
          mx="0"
          gap="6px"
          px="2"
          py="1"
          display="flex"
          flexDirection="column"
        >
          <Text fontSize={"14px"} color="amir.common">
            {event?.title}
          </Text>
          <Flex mx="0" alignItems={"center"} gap="1">
            <Icon mx="0" as={MapPin} />

            <Text fontSize={"10px"} color="amir.secondary">
              {event.address}
            </Text>
          </Flex>
          <Flex mx="0" alignItems={"center"} justifyContent="space-between">
            <Flex mx="0" alignItems={"center"} gap="1" flexWrap={"nowrap"}>
              <Icon mx="0" as={Calendar} />

              <Text fontSize={"10px"} color="amir.secondary">
                {cardDate} - {cardTime}
              </Text>
            </Flex>
            {/* <Flex mx="0" alignItems={"center"} gap="1">
              <Icon mx="0" as={Users} />

              <Text fontSize={"10px"} color="amir.secondary">
                person 3
              </Text>
            </Flex> */}
          </Flex>
          <Flex mx="0" alignItems={"center"} gap="1">
            {IsShowDiscount(event) ? (
              <Text
                fontSize={"10px"}
                color="#FC8181"
                textDecoration="line-through"
              >
                {Toman(event.basePrice)}
              </Text>
            ) : null}
            <Text fontSize={"10px"} color="amir.primary">
              Free
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
};
