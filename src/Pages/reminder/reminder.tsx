import {
  Car,
  PhoneCall,
  RoadHorizon,
  Screwdriver,
  Timer,
  User,
} from "@phosphor-icons/react";
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
import { NavigationCards } from "./navigationCard";

export const Reminder = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetReminder(id!);

  if (isLoading) return <Loading />;
  if (!data) return <EmptyState />;

  const { user, shop } = data.order;

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
              label="کیلومتر موقع سرویس"
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
              value={data.services
                ?.map((service: any) => service.title)
                .join(",  ")}
              color="purple.500"
            />

            <InfoRow
              icon={Car}
              label="اتومبیل"
              value={data?.vehicle?.title}
              color="purple.500"
            />
            <InfoRow
              icon={Timer}
              label="زمان یادآوری"
              value={new Date(data.reminderAt).toLocaleDateString("fa-IR")}
              color="blue.400"
            />
          </Stack>
        </CardBody>
      </Card>

      <NavigationCards
        lat={data?.shop?.profile?.location?.lat}
        lng={data?.shop?.profile?.location?.lng}
      />

      {/* Call To Action */}
      <Stack mt={6} spacing={3}>
        <Button
          colorScheme="blue"
          size="lg"
          leftIcon={<PhoneCall />}
          onClick={() => window.open(`tel:${data.shop?.phoneNumber}`)}
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
