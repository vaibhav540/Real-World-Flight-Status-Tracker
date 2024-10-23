import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Spinner,
  VStack,
  HStack,
  Button,
  Badge,
  Stack,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import {
  MdFlightTakeoff,
  MdFlightLand,
  MdCheckCircle,
  MdError,
  MdAccessAlarm,
} from "react-icons/md"; // Import icons for different statuses
import { fetchFlightByNumber } from "../services/flightService"; // Assuming this function exists to fetch flight details
import { Flight } from "../types"; // Assuming Flight type exists

const FlightDetail: React.FC = () => {
  const { flightNumber } = useParams<{ flightNumber: string }>();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // For error handling

  useEffect(() => {
    const getFlightDetails = async () => {
      try {
        if (flightNumber) {
          const flightData = await fetchFlightByNumber(flightNumber);
          setFlight(flightData);
        }
      } catch (error) {
        console.error("Error fetching flight details:", error);
        setError("Failed to fetch flight details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getFlightDetails();
  }, [flightNumber]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={6} textAlign="center">
        <Text fontSize="lg" color="red.500">
          {error}
        </Text>
      </Box>
    );
  }

  if (!flight) {
    return (
      <Box p={6} textAlign="center">
        <Text fontSize="lg" color="red.500">
          No flight details found.
        </Text>
      </Box>
    );
  }

  // Function to determine the status color and icon
  const getStatusDetails = (status: string) => {
    switch (status.toLowerCase()) {
      case "on time":
        return {
          colorScheme: "green",
          icon: MdCheckCircle,
          tooltip: "This flight is on schedule.",
        };
      case "delayed":
        return {
          colorScheme: "yellow",
          icon: MdAccessAlarm,
          tooltip: "This flight is delayed.",
        };
      case "cancelled":
        return {
          colorScheme: "red",
          icon: MdError,
          tooltip: "This flight has been cancelled.",
        };
      default:
        return {
          colorScheme: "gray",
          icon: MdError,
          tooltip: "Status unknown.",
        };
    }
  };

  const statusDetails = getStatusDetails(flight.status);

  return (
    <div className="container-fluid">
      <Box
        p={6}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="md"
        bg="white"
        maxW="lg"
        mx="auto"
      >
        <Heading as="h2" size="xl" mb={4} textAlign="center">
          Flight Details
        </Heading>
        <VStack spacing={4} align="start">
          <HStack spacing={2} align="center">
            <Icon as={MdFlightTakeoff} boxSize={6} />
            <Text fontWeight="bold">Flight Number:</Text>
            <Text>{flight.flightNumber}</Text>
          </HStack>
          <HStack spacing={2} align="center">
            <Icon as={MdFlightTakeoff} boxSize={6} />
            <Text fontWeight="bold">Airline:</Text>
            <Text>{flight.airline}</Text>
          </HStack>
          <HStack spacing={2} align="center">
            <Icon as={MdFlightTakeoff} boxSize={6} />
            <Text fontWeight="bold">Origin:</Text>
            <Text>{flight.origin}</Text>
          </HStack>
          <HStack spacing={2} align="center">
            <Icon as={MdFlightLand} boxSize={6} />
            <Text fontWeight="bold">Destination:</Text>
            <Text>{flight.destination}</Text>
          </HStack>
          <HStack spacing={2} align="center">
            <Icon as={MdFlightTakeoff} boxSize={6} />
            <Text fontWeight="bold">Departure Time:</Text>
            <Text>{new Date(flight.departureTime).toLocaleString()}</Text>
          </HStack>
          <HStack spacing={2} align="center">
            <Text fontWeight="bold">Status:</Text>
            <Tooltip label={statusDetails.tooltip} aria-label="Status Tooltip">
              <Badge
                colorScheme={statusDetails.colorScheme}
                px={4}
                py={2}
                borderRadius="full"
                display="flex"
                alignItems="center"
              >
                <Icon as={statusDetails.icon} boxSize={5} mr={2} />
                {flight.status}
              </Badge>
            </Tooltip>
          </HStack>
        </VStack>

        <Button colorScheme="teal" mt={6} onClick={() => window.history.back()}>
          Back to Flights
        </Button>
      </Box>
    </div>
  );
};

export default FlightDetail;
