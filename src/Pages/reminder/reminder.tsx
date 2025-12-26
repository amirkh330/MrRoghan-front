import { PhoneCall, RoadHorizon, Screwdriver, Timer, User } from "@phosphor-icons/react";
import {
  Box,
  Text,
  Stack,
  Badge,
  Divider,
  Flex,
  Card,
  CardBody,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetReminder } from "./query/reminderAPI";
import { Loading } from "@/components/CoreComponents/Loading/Loading";
import { EmptyState } from "@/components/Common/EmptyState/EmptyState";


export const Reminder = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetReminder(id!);

  if (isLoading) return <Loading />;
  if (!data) return <EmptyState />;

  const { user, shop } = data.order;
  const service = data.services[0];

  return (
    <Box p={4} dir="rtl" maxW="480px" mx="auto">
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Text fontSize="2xl" fontWeight="bold">
          🔔 یادآوری سرویس خودرو
        </Text>
        <Text fontSize="sm" color="gray.600" mt={1}>
          {user.firstName} عزیز، زمان سرویس خودروی شما فرا رسیده است
        </Text>
      </Box>

      {/* Main Card */}
      <Card borderRadius="2xl" boxShadow="lg">
        <CardBody>
          {/* User */}
          <Flex align="center" gap={2} mb={3}>
            <Icon as={User} color="blue.500" />
            <Text fontWeight="bold">
              {user.firstName} {user.lastName}
            </Text>
          </Flex>

          <Divider my={3} />

          {/* Info */}
          <Stack spacing={3}>
            <InfoRow
              icon={RoadHorizon}
              label="کیلومتر فعلی"
              value={`${data.order.currentDistance} km`}
              color="green.500"
            />

            <InfoRow
              icon={RoadHorizon}
              label="کیلومتر سرویس بعدی"
              value={`${data.order.nextDistance} km`}
              color="orange.400"
            />

            <InfoRow
              icon={Screwdriver}
              label="سرویس مورد نیاز"
              value={service?.title}
              color="purple.500"
            />

            <InfoRow
              icon={Timer}
              label="زمان یادآوری"
              value={new Date(data.reminderAt).toLocaleDateString("fa-IR")}
              color="blue.400"
            />
          </Stack>

          <Divider my={4} />

          {/* Footer */}
          <Flex justify="space-between" align="center">
            <Text fontWeight="bold">
              💰 هزینه تقریبی: {data.order.price} تومان
            </Text>
            <Badge
              colorScheme="green"
              px={3}
              py={1}
              borderRadius="full"
            >
              فعال
            </Badge>
          </Flex>
        </CardBody>
      </Card>

      {/* Call To Action */}
      <Stack mt={6} spacing={3}>
        <Button
          colorScheme="blue"
          size="lg"
          leftIcon={<PhoneCall />}
          onClick={() =>
            window.open(`tel:${user.phoneNumber}`)
          }
        >
          تماس با تعمیرگاه
        </Button>

        <Text fontSize="xs" color="gray.500" textAlign="center">
          لطفاً جهت جلوگیری از آسیب به خودرو، سرویس را به‌موقع انجام دهید.
        </Text>
      </Stack>
    </Box>
  );
};

/* ---------- Component ---------- */
const InfoRow = ({
  icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: string;
  color: string;
}) => (
  <Flex align="center" gap={2}>
    <Icon as={icon} color={color} />
    <Text fontSize="sm">
      {label}: <b>{value}</b>
    </Text>
  </Flex>
);
