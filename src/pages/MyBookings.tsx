import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Input,
  VStack,
  HStack,
  useBreakpointValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
} from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Booking {
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: string;
}

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [flightNumber, setFlightNumber] = useState("");
  const [airline, setAirline] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureTime, setDepartureTime] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 1; // Number of bookings per page for small screens

  // Load bookings from local storage when the component mounts
  useEffect(() => {
    const storedBookings = localStorage.getItem("bookings");
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  const handleBooking = () => {
    if (
      !flightNumber ||
      !airline ||
      !origin ||
      !destination ||
      !departureTime
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const newBooking: Booking = {
      flightNumber,
      airline,
      origin,
      destination,
      departureTime,
      status: "Confirmed",
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    // Clear input fields after booking
    setFlightNumber("");
    setAirline("");
    setOrigin("");
    setDestination("");
    setDepartureTime("");
  };

  const handleCancelBooking = (flightNumberToCancel: string) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      const updatedBookings = bookings.filter(
        (booking) => booking.flightNumber !== flightNumberToCancel
      );
      setBookings(updatedBookings);
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    }
  };

  // Pagination logic
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <div className="container-fluid">
      <Box p={{ base: 4, md: 6 }} bg="gray.60" borderRadius="md" boxShadow="md">
        <Heading mb={4}>My Bookings</Heading>
        <Text mb={4}>Manage and view your current bookings here.</Text>

        {/* Flight Booking Form */}
        <VStack spacing={4} mb={6} width="100%">
          <Text fontWeight="bold">Book a Flight</Text>
          <HStack
            spacing={4}
            flexDirection={isSmallScreen ? "column" : "row"}
            width="100%"
            align="stretch"
          >
            <Input
              placeholder="Flight Number"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              required
              flex="1"
            />
            <Input
              placeholder="Airline"
              value={airline}
              onChange={(e) => setAirline(e.target.value)}
              required
              flex="1"
            />
            <Input
              placeholder="Origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
              flex="1"
            />
            <Input
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              flex="1"
            />
            <Input
              type="datetime-local"
              placeholder="Departure Time"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              required
              flex="1"
            />
            <Button
              colorScheme="teal"
              onClick={handleBooking}
              width={{ base: "full", md: "auto" }}
            >
              Book Flight
            </Button>
          </HStack>
        </VStack>

        {/* Bookings Display */}
        {isSmallScreen ? (
          <VStack spacing={4}>
            {currentBookings.map((booking, index) => (
              <Box
                key={index}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                boxShadow="lg"
                bg="white"
                width="100%"
                transition="0.2s"
                _hover={{ boxShadow: "xl", transform: "scale(1.01)" }}
              >
                <Heading size="md">{booking.flightNumber}</Heading>
                <Text fontWeight="bold">Airline: {booking.airline}</Text>
                <Text>Origin: {booking.origin}</Text>
                <Text>Destination: {booking.destination}</Text>
                <Text>
                  Departure Time:{" "}
                  {new Date(booking.departureTime).toLocaleString()}
                </Text>
                <HStack spacing={2} alignItems="center">
                  <Tag
                    colorScheme={
                      booking.status === "Confirmed" ? "green" : "red"
                    }
                  >
                    {booking.status}
                  </Tag>
                  <Button
                    colorScheme="red"
                    mt={2}
                    onClick={() => handleCancelBooking(booking.flightNumber)}
                  >
                    Cancel
                  </Button>
                </HStack>
              </Box>
            ))}
          </VStack>
        ) : (
          <Table variant="simple" size="md">
            <Thead>
              <Tr>
                <Th>Flight Number</Th>
                <Th>Airline</Th>
                <Th>Origin</Th>
                <Th>Destination</Th>
                <Th>Departure Time</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {bookings.map((booking, index) => (
                <Tr key={index}>
                  <Td>{booking.flightNumber}</Td>
                  <Td>{booking.airline}</Td>
                  <Td>{booking.origin}</Td>
                  <Td>{booking.destination}</Td>
                  <Td>{new Date(booking.departureTime).toLocaleString()}</Td>
                  <Td>
                    <Tag
                      colorScheme={
                        booking.status === "Confirmed" ? "green" : "red"
                      }
                    >
                      {booking.status}
                    </Tag>
                  </Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleCancelBooking(booking.flightNumber)}
                    >
                      Cancel
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}

        {/* Pagination Controls (Visible only on small screens) */}
        {isSmallScreen && bookings.length > bookingsPerPage && (
          <HStack justify="center" mt={6}>
            <Button
              colorScheme="teal"
              onClick={prevPage}
              isDisabled={currentPage === 1}
            >
              Previous
            </Button>
            <Text>
              Page {currentPage} of {totalPages}
            </Text>
            <Button
              colorScheme="teal"
              onClick={nextPage}
              isDisabled={currentPage === totalPages}
            >
              Next
            </Button>
          </HStack>
        )}
      </Box>
    </div>
  );
};

export default MyBookings;
