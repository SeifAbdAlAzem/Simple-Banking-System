import {
  Box,
  Text,
  Button,
  Input,
  VStack,
  FormControl,
  FormLabel,
  useToast,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useCustomer, useCustomers } from "../hooks/useCustomer";
import { createTransfer } from "../services/apiService";
import { Transfer } from "../types";
import { useState, useEffect } from "react";

const CustomerDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const customer = useCustomer(id);
  const allCustomers = useCustomers(); // Fetch all customers to find the recipient
  const [amount, setAmount] = useState<number | "">("");
  const [toId, setToId] = useState<number | "">("");
  const [recipient, setRecipient] = useState<string>("");

  useEffect(() => {
    if (toId) {
      const recipientCustomer = allCustomers.find((c) => c.id === toId);
      setRecipient(recipientCustomer ? recipientCustomer.name : "");
    }
  }, [toId, allCustomers]);

  const handleTransfer = () => {
    if (id && amount && toId) {
      const transfer: Transfer = {
        fromCustomerId: Number(id),
        toCustomerId: toId as number,
        amount: Number(amount),
      };

      createTransfer(transfer)
        .then(() => {
          toast({
            title: "Transfer Successful",
            description: `${customer?.name} has successfully transferred $${amount} to ${recipient}.`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate("/");
        })
        .catch((error) => {
          toast({
            title: "Transfer Failed",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  };

  if (!customer) return null;

  return (
    <VStack spacing={4} p={4} align="stretch">
      <Heading as="h2" size="lg" mb={4}>
        Customer Details
      </Heading>
      <Box
        p={6}
        borderWidth={1}
        borderRadius="md"
        shadow="md"
        bg="white"
        mb={4}
      >
        <Text fontSize="lg" mb={2}>
          <strong>Name:</strong> {customer.name}
        </Text>
        <Text fontSize="lg" mb={2}>
          <strong>Email:</strong> {customer.email}
        </Text>
        <Text fontSize="lg">
          <strong>Balance:</strong> ${customer.balance}
        </Text>
      </Box>
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Transfer Amount</FormLabel>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="0"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Transfer To (Customer ID)</FormLabel>
          <Input
            type="number"
            value={toId}
            onChange={(e) => setToId(Number(e.target.value))}
            placeholder="Enter customer ID"
          />
        </FormControl>
        <Button
          colorScheme="teal"
          onClick={handleTransfer}
          isDisabled={amount === "" || toId === ""}
        >
          Transfer Money
        </Button>
      </Stack>
    </VStack>
  );
};

export default CustomerDetailsPage;
