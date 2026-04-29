import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { NavigationArrow } from "@phosphor-icons/react";

interface Props {
  lat: number;
  lng: number;
}

export const NavigationCards = ({ lat, lng }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openGoogle = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank",
    );
  };

  const openWaze = () => {
    window.open(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`, "_blank");
  };

  const openBalad = () => {
    window.open(`https://balad.ir/p/${lat},${lng}`, "_blank");
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="green" size="lg" w={"full"} mt="4" leftIcon={<NavigationArrow/>}>
        مسیریابی
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="16px">
          <ModalHeader>انتخاب مسیریاب</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <VStack spacing={3}>
              <Box
                w="100%"
                p={3}
                borderRadius="10px"
                cursor="pointer"
                bg="gray.100"
                _hover={{ bg: "gray.200" }}
                onClick={openGoogle}
              >
                Google Maps
              </Box>

              <Box
                w="100%"
                p={3}
                borderRadius="10px"
                cursor="pointer"
                bg="gray.100"
                _hover={{ bg: "gray.200" }}
                onClick={openWaze}
              >
                Waze
              </Box>

              <Box
                w="100%"
                p={3}
                borderRadius="10px"
                cursor="pointer"
                bg="gray.100"
                _hover={{ bg: "gray.200" }}
                onClick={openBalad}
              >
                Balad (بلد)
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
