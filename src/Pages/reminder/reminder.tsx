import {
  Box,
  Text,
  Stack,
  Badge,
  Divider,
  Flex,
  Card,
  CardBody,
  Icon,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetReminder } from "./query/reminderAPI";
import { Loading } from "@/components/CoreComponents/Loading/Loading";
import { EmptyState } from "@/components/Common/EmptyState/EmptyState";
import { RoadHorizon, Screwdriver, Timer, User } from "@phosphor-icons/react";

export const Reminder = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetReminder(id!);

  if (isLoading) return <Loading />;
  if (!data) return <EmptyState />;

  const user = data.order.user;
  const service = data.services[0];

  return (
    <Box p={4} dir="rtl" maxW="480px" mx="auto">
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Text fontSize="xl" fontWeight="bold">
          👋 {user.firstName} عزیز
        </Text>
        <Text fontSize="sm" color="gray.600" mt={1}>
          این پیام برای یادآوری سرویس خودروی شماست
        </Text>
      </Box>

      {/* Main Card */}
      <Card borderRadius="xl" boxShadow="lg">
        <CardBody>
          {/* User Info */}
          <Flex align="center" gap={2} mb={3}>
            <Icon as={User} color="blue.500" />
            <Text fontWeight="bold">
              {user.firstName} {user.lastName}
            </Text>
          </Flex>

          <Divider my={2} />

          {/* Service Info */}
          <Stack spacing={3}>
            <Flex align="center" gap={2}>
              <Icon as={RoadHorizon} color="green.500" />
              <Text>
                کیلومتر فعلی:
                <b> {data.order.currentDistance} km</b>
              </Text>
            </Flex>

            <Flex align="center" gap={2}>
              <Icon as={RoadHorizon} color="orange.400" />
              <Text>
                کیلومتر سرویس بعدی:
                <b> {data.order.nextDistance} km</b>
              </Text>
            </Flex>

            <Flex align="center" gap={2}>
              <Icon as={Screwdriver} color="purple.500" />
              <Text>
                سرویس مورد نیاز:
                <b> {service?.title}</b>
              </Text>
            </Flex>

            <Flex align="center" gap={2}>
              <Icon as={Timer} color="blue.400" />
              <Text>
                زمان یادآوری:
                <b>
                  {" "}
                  {new Date(data.reminderAt).toLocaleDateString("fa-IR")}
                </b>
              </Text>
            </Flex>
          </Stack>

          <Divider my={4} />

          {/* Price & Status */}
          <Flex justify="space-between" align="center">
            <Text fontWeight="bold">
              💰 هزینه تقریبی: {data.order.price} تومان
            </Text>
            <Badge
              colorScheme={data.status === "sent" ? "green" : "orange"}
              px={3}
              py={1}
              borderRadius="full"
            >
              {data.status === "sent" ? "ارسال شده" : "در انتظار"}
            </Badge>
          </Flex>
        </CardBody>
      </Card>

      {/* Footer Message */}
      <Box mt={6} textAlign="center">
        <Text fontSize="sm" color="gray.600">
          🔔 لطفاً جهت حفظ سلامت خودرو، سرویس خود را به موقع انجام دهید.
        </Text>
      </Box>
    </Box>
  );
};
