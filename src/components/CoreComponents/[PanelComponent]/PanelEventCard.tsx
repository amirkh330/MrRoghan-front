import { CallApiHost } from "@/settings/axiosConfig";
import {
  IPanelEventCard,
  IPanelEventTime,
} from "@/types/responses/ResponsesTypes";
import { Toman } from "@/utils/Toman/Toman";
import {
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import {
  Calendar,
  Money,
  PiggyBank,
  Star,
  Ticket,
  Pen,
  Percent,
  Trash,
  Users,
  DotsThreeVertical,
} from "@phosphor-icons/react";

import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import BottomSheet from "../BottomSheet/BottomSheet";
import { Loading } from "../Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import { IsShowDiscount } from "@/utils/IsShowDiscount/IsShowDiscount";
import { PanelEventAddSans } from "@/Pages/[Panel]/PanelEventAddSans/PanelEventAddSans";

interface ISansInfo {
  id: number;
  dateId: number;
  initialCapacity: number;
  availableCapacity: number;
  date: string;
  from: string;
  to: string;
  basePrice: number;
  finalPrice: number;
  discountPercent: number;
}

export const PanelEventCard = ({
  panelCardItem,
}: {
  panelCardItem: IPanelEventCard;
}) => {
  const [visibleSans, setVisibleSans] = useState<IPanelEventTime | undefined>();
  const [sansInfo, setSansInfo] = useState<ISansInfo>();
  const [loading, setLoading] = useState(true);
  const [eventId, setEventId] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    visibleSans &&
      CallApiHost.get(`/events/${panelCardItem.id}/times/${visibleSans.timeId}`)
        .then(({ data }) => setSansInfo(data))
        .finally(() => setLoading(false));
  }, [visibleSans]);
  return (
    <>
      <chakra.div bgColor="amir.secondaryBg" p="2" my="4" borderRadius="4px">
        <Flex mx="0" justifyContent="space-between" alignItems="flex-start">
          <Flex mx="0">
            <Image
              me={2}
              w="88px"
              h="104px"
              objectFit="cover"
              borderRadius={"4px"}
              src={panelCardItem.logoUrl}
            />
            <Box mx="0">
              <Text fontSize="14px" fontWeight={500} color="amir.common">
                {panelCardItem.title}
              </Text>

              <Flex
                mx="0"
                px="2"
                my="2"
                gap="2"
                w="fit-content"
                borderRadius={"8px"}
                alignItems={"center"}
                justifyContent="center"
                bgColor={"#5C5C5C"}
                color={"#E7E7E7"}
              >
                <Icon as={Star} color={"yellow.500"} weight="fill" mx="0" />
                <Text fontSize={"12px"} fontWeight={400} mx="0">
                  {panelCardItem.rate}
                </Text>
              </Flex>
            </Box>
          </Flex>
          <Box mx="0" textAlign="end">
            <Link to={`/panel/events/${panelCardItem.id}`}>
              <Text fontSize="12px" fontWeight={500} color="amir.primary">
                جزئیات ایونت
              </Text>
            </Link>
            <Text
              my="2"
              fontSize="12px"
              fontWeight={500}
              color="amir.common"
              onClick={() => setEventId(panelCardItem.id)}
            >
              افزودن سانس
            </Text>
          </Box>
        </Flex>
        <Text my="2" fontSize="12px" fontWeight={400} color="amir.common">
          سانس‌ها
        </Text>
        <Flex overflow="auto" gap="2" mx="0">
          {panelCardItem.times.map((time, i) => {
            return (
              <chakra.div
                p="2"
                key={time.dateId}
                textAlign="center"
                border="1px solid"
                borderRadius="8px"
                display="flex"
                mx="0"
                borderColor="#7C7B7C"
                justifyContent="space-between"
                flexDirection="column"
                minW="120px !important"
              >
                <chakra.div>
                  <Text fontSize="12px" fontWeight="400" color="amir.common">
                    {time.date}
                  </Text>
                  <Text
                    my="2"
                    fontSize="12px"
                    fontWeight="400"
                    color="amir.common"
                  >
                    {time.from} تا {time.to}
                  </Text>
                </chakra.div>
                <chakra.div mx="0">
                  <Flex alignItems="center" justifyContent={"space-between"}>
                    <Text
                      my="3"
                      fontSize="12px"
                      fontWeight="400"
                      color="amir.primary"
                      onClick={() => setVisibleSans(time)}
                    >
                      اطلاعات سانس
                    </Text>

                    <Menu>
                      <MenuButton>
                        <Icon
                          display="flex"
                          as={DotsThreeVertical}
                          color={"amir.common"}
                        />
                      </MenuButton>
                      <MenuList>
                        <Link
                          to={`/panel/events/create?eventId=${panelCardItem.id}`}
                        >
                          <MenuItem icon={<Pen />}>اصلاح ایونت</MenuItem>
                        </Link>
                        <MenuItem icon={<Trash />}>لغو ایونت</MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                  {renderStatus(time)}
                </chakra.div>
              </chakra.div>
            );
          })}
        </Flex>
      </chakra.div>

      {visibleSans ? (
        <BottomSheet
          title={"اطلاعات سانس"}
          isOpen={!!visibleSans}
          onOpen={() => setVisibleSans(undefined)}
          onClose={() => setVisibleSans(undefined)}
        >
          {loading ? (
            <Loading />
          ) : (
            <chakra.div py="2">
              <Flex
                px="4"
                my="4"
                mx="0"
                justifyContent="space-between"
                alignItems="center"
              >
                <Flex mx="0" alignItems="center" gap={1}>
                  <Icon color="amir.secondary" as={Calendar} mx="0" />
                  <Text color="amir.secondary" fontSize="16px" fontWeight="500">
                    {sansInfo?.date}
                  </Text>
                </Flex>

                <Flex mx="0" alignItems="center" gap={1}>
                  <Icon as={Users} mx="0" />
                  <Text color="amir.secondary" fontSize="16px" fontWeight="500">
                    {sansInfo?.from} تا {sansInfo?.to}
                  </Text>
                </Flex>
              </Flex>

              <Flex
                my="4"
                mx="0"
                px="4"
                justifyContent="space-between"
                alignItems="center"
              >
                <Flex mx="0" alignItems="center" gap={1}>
                  <Icon color="amir.secondary" as={Users} mx="0" />
                  <Text color="amir.secondary" fontSize="16px" fontWeight="500">
                    ظرفیت سانس:
                  </Text>
                </Flex>

                <Flex mx="0" alignItems="center" gap={1}>
                  <Text color="amir.secondary" fontSize="16px" fontWeight="500">
                    {sansInfo?.initialCapacity} نفر
                  </Text>
                </Flex>
              </Flex>

              <Divider color="gray.600" my="4" />

              <Flex
                my="4"
                mx="0"
                px="4"
                justifyContent="space-between"
                alignItems="center"
              >
                <Flex mx="0" alignItems="center" gap={1}>
                  <Icon color="amir.secondary" as={Ticket} mx="0" />
                  <Text color="amir.secondary" fontSize="16px" fontWeight="500">
                    تعداد رزرو
                  </Text>
                </Flex>

                <Flex mx="0" alignItems="center" gap={1}>
                  <Text color="amir.secondary" fontSize="16px" fontWeight="500">
                    {sansInfo?.initialCapacity! - sansInfo?.availableCapacity!}{" "}
                    نفر
                  </Text>
                </Flex>
              </Flex>

              <Flex
                my="4"
                mx="0"
                px="4"
                justifyContent="space-between"
                alignItems="center"
              >
                <Flex mx="0" alignItems="center" gap={1}>
                  <Icon color="amir.secondary" as={Money} mx="0" />
                  <Text color="amir.secondary" fontSize="16px" fontWeight="500">
                    قیمت برای هر نفر
                  </Text>
                </Flex>

                <Flex mx="0" alignItems="center" gap={1}>
                  {IsShowDiscount({
                    basePrice: sansInfo?.basePrice!,
                    finalPrice: sansInfo?.finalPrice!,
                  }) ? (
                    <Text
                      fontSize={"12px"}
                      color="#FC8181"
                      textDecoration="line-through"
                    >
                      {Toman(sansInfo?.basePrice!)}
                    </Text>
                  ) : null}

                  <Text color="amir.secondary" fontSize="16px" fontWeight="500">
                    {Toman(sansInfo?.finalPrice!)}
                  </Text>
                </Flex>
              </Flex>

              <Flex
                my="4"
                mx="0"
                px="4"
                justifyContent="space-between"
                alignItems="center"
              >
                <Flex mx="0" alignItems="center" gap={1}>
                  <Icon color="amir.secondary" as={Percent} mx="0" />
                  <Text color="amir.secondary" fontSize="16px" fontWeight="500">
                    تخفیف
                  </Text>
                </Flex>

                <Flex mx="0" alignItems="center" gap={1}>
                  <Text color="amir.secondary" fontSize="16px" fontWeight="500">
                    {sansInfo?.discountPercent} %
                  </Text>
                </Flex>
              </Flex>

              <Flex
                px="4"
                my="4"
                mx="0"
                py="1"
                bgColor={"#3D0368"}
                justifyContent="space-between"
                alignItems="center"
              >
                <Flex mx="0" alignItems="center" gap={1}>
                  <Icon color="amir.secondary" as={PiggyBank} mx="0" />
                  <Text color="amir.secondary" fontSize="16px" fontWeight="500">
                    مجموع فروش سانس
                  </Text>
                </Flex>

                <Flex mx="0" alignItems="center" gap={1}>
                  <Text color="amir.secondary" fontSize="16px" fontWeight="500">
                    {Toman(sansInfo?.discountPercent!)}
                  </Text>
                </Flex>
              </Flex>
            </chakra.div>
          )}
        </BottomSheet>
      ) : null}

      {eventId ? (
        <BottomSheet
          title={"افزودن سانس"}
          isOpen={!!eventId}
          onOpen={() => setEventId(0)}
          onClose={() => {
            setEventId(0);
          }}
        >
          <PanelEventAddSans
            eventId={eventId}
            onClose={() => {
              window.location.reload();
              setEventId(0);
            }}
          />
        </BottomSheet>
      ) : null}
    </>
  );
};

const renderStatus = (item: any) => {
  switch (item.status) {
    case "Ready":
      return <CountDown time={item} />;
    case "ReadyToSetup":
      return (
        <Button
        as={Link}
        fontSize={"12px"}
        borderRadius={"6px"}
        w="full"
        bgColor={"amir.primary"}
          to={`/panel/games/${item.gameSessionId}`}
        >
          آماده‌سازی بازی
        </Button>
      );

    case "Finished":
      return (
        <Button
          w="full"
          fontSize={"12px"}
          border="1px solid"
          borderRadius={"6px"}
          bgColor={"transparent"}
          borderColor={"amir.primary"}
          color={"amir.primary"}
        >
          بازی تمام شده
        </Button>
      );
    case "Started":
      return (
        <Button
          w="full"
          as={Link}
          fontSize={"12px"}
          borderRadius={"6px"}
          bg={"transparent"}
          border={"1px solid"}
          borderColor={"amir.primary"}
          color={"amir.primary"}
          to={`/panel/games/${item.gameSessionId}/start`}
        >
          ورود به بازی
        </Button>
      );

    default:
      return <CountDown time={item} />;
  }
};

const CountDown = ({ time }: any) => {
  return (
    <Countdown
      date={time?.startAt}
      renderer={(props) => {
        return (
          <Box w="100%">
            <Flex
              p="8px"
              borderRadius="6px"
              bgColor="amir.secondaryVariant"
              fontSize="12px"
              fontWeight={500}
              color="amir.mainBg"
              alignItems="center"
              flexDir="row-reverse"
            >
              <chakra.div>{props.days}</chakra.div>:
              <chakra.div>{props.hours}</chakra.div>:
              <chakra.div>{props.minutes}</chakra.div>:
              <chakra.div>{props.seconds}</chakra.div>
            </Flex>
          </Box>
        );
      }}
    />
  );
};
