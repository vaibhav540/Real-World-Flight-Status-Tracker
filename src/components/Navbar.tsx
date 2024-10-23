import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Box,
  Flex,
  Button,
  Heading,
  IconButton,
  Collapse,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Navbar: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      bg="blue.600"
      px={4}
      py={2}
      position="sticky"
      top="0"
      zIndex="1000"
      boxShadow="md"
      width="100%"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Heading
            as="h1"
            size="lg"
            color="white"
            display="flex"
            alignItems="center"
          >
            FlightTracker
            <img
              src="/logoF.png"
              alt="Flight Icon"
              style={{
                width: "70px",
                height: "70px",
                marginLeft: "4px",
                verticalAlign: "middle",
              }}
            />
          </Heading>
        </Flex>

        {/* Hamburger Icon for small screens */}
        <IconButton
          aria-label="Toggle Navigation"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="outline"
          colorScheme="whiteAlpha"
          onClick={onToggle}
          display={{ base: "flex", md: "none" }}
        />

        {/* Navigation Buttons for larger screens */}
        <Flex
          display={{ base: "none", md: "flex" }}
          justifyContent="space-between"
        >
          <Button as={Link} to="/" variant="ghost" color="black">
            My Bookings
          </Button>
          <Button as={Link} to="/flight-status" variant="ghost" color="black">
            Flight Status
          </Button>
          <Button as={Link} to="/login" variant="ghost" color="black">
            Login/Signup
          </Button>
          <Button as={Link} to="/support" variant="ghost" color="black">
            Support
          </Button>
        </Flex>
      </Flex>

      {/* Collapse menu for small screens */}
      <Collapse in={isOpen} animateOpacity>
        <VStack spacing={4} align="stretch" mt={4} display={{ md: "none" }}>
          <Button as={Link} to="/" variant="ghost" color="black">
            My Bookings
          </Button>
          <Button as={Link} to="/flight-status" variant="ghost" color="black">
            Flight Status
          </Button>
          <Button as={Link} to="/login" variant="ghost" color="black">
            Login/Signup
          </Button>
          <Button as={Link} to="/support" variant="ghost" color="black">
            Support
          </Button>
        </VStack>
      </Collapse>
    </Box>
  );
};

export default Navbar;
