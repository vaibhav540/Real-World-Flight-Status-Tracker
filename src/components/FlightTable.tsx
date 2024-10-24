import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Text,
  Badge,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Flight } from "../types"; // Assuming Flight type exists

interface FlightTableProps {
  flights: Flight[];
}

const FlightTable: React.FC<FlightTableProps> = ({ flights }) => {
  const tableBg = useColorModeValue("white", "gray.800");
  const headerBg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      maxW="100%"
      mx="auto"
      mt={8}
      p={[2, 4, 6]} // Responsive padding for small to large screens
      bg={tableBg}
      borderRadius="lg"
      boxShadow="lg"
      border="1px"
      borderColor={borderColor}
      overflowX="auto" // Horizontal scroll for small screens
    >
      <Text
        fontSize={["lg", "xl", "2xl"]} // Adjust font size for small to large screens
        mb={4}
        fontWeight="bold"
        textAlign="center"
      >
        Flight Status Overview
      </Text>
      <Table variant="striped" colorScheme="teal" size={["sm", "md", "lg"]}>
        <Thead bg={headerBg}>
          <Tr>
            <Th
              fontSize={["xs", "sm", "md"]}
              display={{ base: "table-cell", md: "table-cell" }}
            >
              Flight
            </Th>
            <Th
              fontSize={["xs", "sm", "md"]}
              display={{ base: "none", md: "table-cell" }}
            >
              Airline
            </Th>
            <Th
              fontSize={["xs", "sm", "md"]}
              display={{ base: "table-cell", md: "table-cell" }}
            >
              Origin
            </Th>
            <Th
              fontSize={["xs", "sm", "md"]}
              display={{ base: "none", md: "table-cell" }}
            >
              Destination
            </Th>
            <Th
              fontSize={["xs", "sm", "md"]}
              display={{ base: "none", lg: "table-cell" }} // Show on large screens only
            >
              Departure Time
            </Th>
            <Th
              fontSize={["xs", "sm", "md"]}
              display={{ base: "table-cell", md: "table-cell" }}
            >
              Status
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {flights.length > 0 ? (
            flights.map((flight) => (
              <Tr key={flight.flightNumber} _hover={{ bg: "gray.50" }}>
                <Td display={{ base: "table-cell", md: "table-cell" }}>
                  <Button
                    as={Link}
                    to={`/flight-detail/${flight.flightNumber}`}
                    variant="link"
                    colorScheme="teal"
                    fontWeight="bold"
                    fontSize={["sm", "md"]} // Adjust for small screens
                  >
                    {flight.flightNumber}
                  </Button>
                </Td>
                <Td display={{ base: "none", md: "table-cell" }}>
                  {flight.airline}
                </Td>
                <Td display={{ base: "table-cell", md: "table-cell" }}>
                  {flight.origin}
                </Td>
                <Td display={{ base: "none", md: "table-cell" }}>
                  {flight.destination}
                </Td>
                <Td display={{ base: "none", lg: "table-cell" }}>
                  {" "}
                  {/* Show only on large screens */}
                  {new Date(flight.departureTime).toLocaleString()}
                </Td>
                <Td display={{ base: "table-cell", md: "table-cell" }}>
                  <Badge
                    colorScheme={
                      flight.status === "On Time"
                        ? "green"
                        : flight.status === "Delayed"
                        ? "red"
                        : "yellow"
                    }
                    variant="solid"
                    borderRadius="full"
                    px={2}
                    fontSize={["xs", "sm"]} // Adjust for small screens
                  >
                    {flight.status}
                  </Badge>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={6}>
                <Flex justify="center" align="center" p={4}>
                  <Text fontSize="lg" color="gray.500">
                    No flight data available.
                  </Text>
                </Flex>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default FlightTable;
