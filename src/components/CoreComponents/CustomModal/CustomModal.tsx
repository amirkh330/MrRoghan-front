import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay
} from "@chakra-ui/react";
import React from "react";

export const CustomModal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnEsc>
      <ModalOverlay />
      <ModalContent>
        {/* <ModalHeader>Verify OTP</ModalHeader> */}
        <ModalCloseButton onClick={() => {}} />
        <ModalBody mx="0">{children}</ModalBody>
        {/* <ModalFooter>
                <Button colorScheme="blue" onClick={handleVerifyOtp} mr={3}>
                  Verify
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};
