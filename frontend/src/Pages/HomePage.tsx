import { Box, Text, Button, VStack, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCustomers } from "../hooks/useCustomer";

const HomePage = () => {
  const customers = useCustomers();

  return (
    <VStack spacing={4} p={4}>
      <Text fontSize="3xl" fontWeight="bold">
        Customers
      </Text>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {customers.map((customer) => (
          <Box
            key={customer.id}
            p={4}
            borderWidth={1}
            borderRadius="md"
            boxShadow="md"
            bg="white"
            _hover={{ bg: "gray.50", transform: "scale(1.05)" }}
            transition="transform 0.2s"
          >
            <Text fontSize="lg" fontWeight="semibold">
              Name: {customer.name}
            </Text>
            <Text>Email: {customer.email}</Text>
            <Text>Balance: ${customer.balance}</Text>
            <Link to={`/customer/${customer.id}`}>
              <Button mt={2} colorScheme="teal" variant="outline">
                View Details
              </Button>
            </Link>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default HomePage;
