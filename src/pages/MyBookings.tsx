import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Input,
  VStack,
  HStack,
  Select,
  Divider,
  useBreakpointValue,
  FormControl,
  FormErrorMessage,
  Alert,
  AlertIcon,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Stack,
  Icon,
  Image,
} from "@chakra-ui/react";
import { FaPlaneDeparture } from "react-icons/fa"; // Using an icon for added visual appeal
import "bootstrap/dist/css/bootstrap.min.css";

interface Ticket {
  fromCity: string;
  toCity: string;
  departureDate: string;
  travelType: string;
  passengers: number;
  payWith: string;
}

const MyBookings: React.FC = () => {
  const [fromCity, setFromCity] = useState("Delhi, DEL");
  const [toCity, setToCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [travelType, setTravelType] = useState("One Way");
  const [passengers, setPassengers] = useState(1);
  const [payWith, setPayWith] = useState("Cash");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [currentPage, setCurrentPage] = useState(0); // 0-based index for pages
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errors, setErrors] = useState({
    fromCity: false,
    toCity: false,
    departureDate: false,
    payWith: false,
  });

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const storedTickets = localStorage.getItem("flightTickets");
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    }
  }, []);

  const handleSearch = () => {
    const newErrors = {
      fromCity: !fromCity.trim(),
      toCity: !toCity.trim(),
      departureDate: !departureDate.trim(),
      payWith: !payWith.trim(),
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => error === false);
    if (!isValid) return;

    const newTicket: Ticket = {
      fromCity,
      toCity,
      departureDate,
      travelType,
      passengers,
      payWith,
    };

    const updatedTickets = [...tickets, newTicket];
    setTickets(updatedTickets);
    localStorage.setItem("flightTickets", JSON.stringify(updatedTickets));
  };

  const handleCancelTicket = () => {
    setShowConfirmCancel(true);
  };

  const confirmCancel = () => {
    const updatedTickets = tickets.filter((_, index) => index !== currentPage);
    setTickets(updatedTickets);
    localStorage.setItem("flightTickets", JSON.stringify(updatedTickets));
    setShowConfirmCancel(false);
    setShowSuccessMessage(true);
    setCurrentPage(0);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  const cancelCancel = () => {
    setShowConfirmCancel(false);
  };

  const totalPages = Math.ceil(tickets.length);

  const handlePrint = () => {
    const printContents = document.getElementById("ticket-details")?.innerHTML;
    const newWindow = window.open("");
    newWindow!.document.write(`
      <html>
        <head>
          <title>Print Ticket</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1, h2, p { margin: 0; }
          </style>
        </head>
        <body>
          <h1>Flight Ticket</h1>
          ${printContents}
        </body>
      </html>
    `);
    newWindow!.document.close();
    newWindow!.focus();
    newWindow!.print();
    newWindow!.close();
  };

  return (
    <Box
      maxW={{ base: "95%", md: "960px" }}
      mx="auto"
      mt={10}
      bg="white"
      borderRadius="md"
      boxShadow="lg"
      p={{ base: 4, md: 6, lg: 8 }}
    >
      <Heading
        mb={4}
        fontSize={{ base: "lg", md: "xl" }}
        textAlign={{ base: "center", md: "left" }}
        color="blue.700"
      >
        Hi there, where would you like to Travel today?
      </Heading>
      <VStack spacing={4} align="start" width="100%">
        <HStack
          width="100%"
          justify="space-between"
          align="center"
          flexDirection={{ base: "column", md: "row" }}
        >
          <HStack spacing={4} flexWrap={{ base: "wrap", md: "nowrap" }}>
            {["One Way", "Round Trip", "Multi City"].map((type) => (
              <Button
                key={type}
                variant={travelType === type ? "solid" : "outline"}
                colorScheme="blue"
                onClick={() => setTravelType(type)}
                size={{ base: "sm", md: "md" }}
                mb={{ base: 2, md: 0 }}
              >
                {type}
              </Button>
            ))}
          </HStack>
          <Button
            size={{ base: "sm", md: "md" }}
            colorScheme="blue"
            mt={{ base: 2, md: 0 }}
          >
            ₹ INR
          </Button>
        </HStack>

        <VStack spacing={4} width="100%" align="stretch">
          <FormControl isInvalid={errors.fromCity}>
            <Text fontSize="sm">From</Text>
            <Input
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              placeholder="Search by place/airport"
              size="lg"
            />
            {errors.fromCity && (
              <FormErrorMessage>From city is required</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={errors.toCity}>
            <Text fontSize="sm">To</Text>
            <Input
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              placeholder="Search by place/airport"
              size="lg"
            />
            {errors.toCity && (
              <FormErrorMessage>To city is required</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={errors.departureDate}>
            <Text fontSize="sm">Departure</Text>
            <Input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              size="lg"
            />
            {errors.departureDate && (
              <FormErrorMessage>Departure date is required</FormErrorMessage>
            )}
          </FormControl>

          <Box width="100%">
            <Text fontSize="sm">Travellers + Special Fares</Text>
            <Select
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              size="lg"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} Passenger{num > 1 ? "s" : ""}
                </option>
              ))}
            </Select>
          </Box>

          <FormControl isInvalid={errors.payWith}>
            <Text fontSize="sm">Pay with</Text>
            <Select
              value={payWith}
              onChange={(e) => setPayWith(e.target.value)}
              size="lg"
            >
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
            </Select>
            {errors.payWith && (
              <FormErrorMessage>Payment method is required</FormErrorMessage>
            )}
          </FormControl>
        </VStack>

        <HStack width="100%" justify="space-between">
          <Button variant="link" color="blue.500" fontWeight="bold">
            ADD PROMOCODE
          </Button>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={handleSearch}
            isDisabled={!fromCity || !toCity || !departureDate || !payWith}
          >
            Book Now
          </Button>
        </HStack>
      </VStack>

      {/* Flight Tickets Display */}
      {tickets.length > 0 && (
        <Box mt={6}>
          <SimpleGrid columns={{ base: 1 }} spacing={4} justifyItems="center">
            <Card
              key={currentPage}
              variant="outline"
              borderWidth="1px"
              borderColor="gray.200"
              maxW="90%" // Set card width to 90% of the container
              borderRadius="md" // Rectangular shape
              width="100%" // Ensure card takes the full width allowed by maxW
              mx="auto" // Center the card
            >
              <CardHeader>
                <HStack spacing={2} alignItems="center">
                  <Icon as={FaPlaneDeparture} boxSize={6} color="blue.500" />
                  <Text fontSize="lg" fontWeight="bold">
                    Flight Ticket
                  </Text>
                </HStack>
              </CardHeader>
              <CardBody id="ticket-details">
                <Stack spacing={3}>
                  {/* Display only relevant information based on screen size */}
                  {!isSmallScreen && (
                    <>
                      <Box display="flex" justifyContent="start" mb={3}>
                        <Image
                          src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                            JSON.stringify(tickets[currentPage])
                          )}`}
                          alt="QR Code"
                          boxSize="150px" // Increased size of QR code
                        />
                      </Box>
                      <Text>
                        {" "}
                        <span style={{ fontWeight: "bold" }}>From:</span>{" "}
                        {tickets[currentPage].fromCity}
                      </Text>
                      <Text>
                        <span style={{ fontWeight: "bold" }}>To:</span>{" "}
                        {tickets[currentPage].toCity}
                      </Text>
                      <Text>
                        <span style={{ fontWeight: "bold" }}>Departure:</span>{" "}
                        {tickets[currentPage].departureDate}
                      </Text>
                      <Text>
                        <span style={{ fontWeight: "bold" }}>
                          Travel Type:{" "}
                        </span>{" "}
                        {tickets[currentPage].travelType}
                      </Text>
                      <Text>
                        <span style={{ fontWeight: "bold" }}>Passengers: </span>{" "}
                        {tickets[currentPage].passengers}
                      </Text>
                      <Text>
                        <span style={{ fontWeight: "bold" }}>
                          Payment Method:{" "}
                        </span>{" "}
                        {tickets[currentPage].payWith}
                      </Text>
                    </>
                  )}
                  {isSmallScreen && (
                    <>
                      <Image
                        src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                          JSON.stringify(tickets[currentPage])
                        )}`}
                        alt="QR Code"
                        boxSize="90px" // Increased size of QR code
                      />
                      <Text>
                        <span style={{ fontWeight: "bold" }}>From:</span>{" "}
                        {tickets[currentPage].fromCity}
                      </Text>
                      <Text>
                        <span style={{ fontWeight: "bold" }}>To:</span>{" "}
                        {tickets[currentPage].toCity}
                      </Text>
                      <Text>
                        <span style={{ fontWeight: "bold" }}>Departure:</span>{" "}
                        {tickets[currentPage].departureDate}
                      </Text>
                    </>
                  )}
                </Stack>
              </CardBody>
              <HStack spacing={2} p={4} justify="start">
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={handleCancelTicket}
                >
                  Cancel
                </Button>
                <Button colorScheme="blue" size="sm" onClick={handlePrint}>
                  Print
                </Button>
              </HStack>
            </Card>
          </SimpleGrid>
          <HStack spacing={1} mt={4} ml={10}>
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              isDisabled={currentPage === 0}
            >
              Previous
            </Button>
            {
              <Text mt={4}>
                <h6>
                  {currentPage + 1}/{totalPages}
                </h6>
              </Text>
            }
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              isDisabled={currentPage === totalPages - 1}
            >
              Next
            </Button>
          </HStack>
        </Box>
      )}

      {/* Alert for Cancel Confirmation */}
      {showConfirmCancel && (
        <Alert status="warning" mt={4}>
          <AlertIcon />
          Are you sure you want to cancel this ticket?
          <Button onClick={confirmCancel} colorScheme="red" ml={3}>
            Yes
          </Button>
          <Button onClick={cancelCancel} ml={2}>
            No
          </Button>
        </Alert>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <Alert status="success" mt={4}>
          <AlertIcon />
          Ticket canceled successfully,Now Wait For Your Refund!!!
        </Alert>
      )}
    </Box>
  );
};

export default MyBookings;
