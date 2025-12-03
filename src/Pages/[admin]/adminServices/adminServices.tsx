import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { Plus, PencilSimple, Trash } from "@phosphor-icons/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useAddService,
  useDeleteService,
  useEditService,
  useGetServices,
} from "../query/serviceAPI";

// Fake API services (replace with real urls)
const api = {
  getServices: async () => {
    const res = await fetch("/api/services");
    return res.json();
  },
  createService: async (payload: any) => {
    const res = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  },
  updateService: async ({ id, title }: any) => {
    const res = await fetch(`/api/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    return res.json();
  },
  deleteService: async (id: any) => {
    const res = await fetch(`/api/services/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },
};

export const AdminServices = () => {
  const toast = useToast();
  const [selectedService, setSelectedService] = useState<any>(null);
  const [title, setTitle] = useState("");

  const queryClient = useQueryClient();
  const modal = useDisclosure();

  const { data, isFetching: isLoading } = useGetServices("");
  const deleteMutation = useDeleteService();
  const editMutation = useEditService();
  const addMutation = useAddService();

  const openCreate = () => {
    setSelectedService(null);
    setTitle("");
    modal.onOpen();
  };

  const openEdit = (service: any) => {
    setSelectedService(service);
    setTitle(service.title);
    modal.onOpen();
  };

  const handleUpdate = () => {
    queryClient.invalidateQueries({ queryKey: ["services"] });
  };

  const handleSubmit = () => {
    if (!title) {
      return toast({ title: "عنوان وارد شود", status: "error" });
    }
    selectedService
      ? editMutation.mutateAsync({ id: selectedService.id, title }).then(() => {
          handleUpdate();
          modal.onClose();
          toast({ title: "ویرایش با موفقیت انجام شد", status: "success" });
        })
      : addMutation.mutateAsync({ title }).then(() => {
          handleUpdate();
          modal.onClose();
          toast({ title: "افزودن با موفقیت انجام شد", status: "success" });
        });
  };

  return (
    <Box>
      <Flex mb={5} align="center" justify="space-between">
        <Heading size="lg">مدیریت سرویس‌ها</Heading>
        <Button
          leftIcon={<Plus size={20} />}
          colorScheme="teal"
          onClick={openCreate}
        >
          افزودن سرویس
        </Button>
      </Flex>

      {isLoading ? (
        <Flex justify="center" p={10}>
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Table variant="simple" bg="white" rounded="md" shadow="md">
          <Thead>
            <Tr>
              <Th>شناسه</Th>
              <Th>عنوان</Th>
              <Th>عملیات</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((service: any) => (
              <Tr key={service.id}>
                <Td>{service.id}</Td>
                <Td>{service.title}</Td>
                <Td>
                  <HStack>
                    <PencilSimple
                      color="blue"
                      size={20}
                      onClick={() => openEdit(service)}
                    />

                    <Trash
                      size={20}
                      color="red"
                      onClick={() =>
                        deleteMutation
                          .mutateAsync(service.id)
                          .then(() => handleUpdate())
                      }
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {/* Modal */}
      <Modal isOpen={modal.isOpen} onClose={modal.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedService ? "ویرایش سرویس" : "افزودن سرویس"}
          </ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>عنوان سرویس</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              onClick={handleSubmit}
              isLoading={addMutation.isPending || editMutation.isPending}
            >
              ذخیره
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
