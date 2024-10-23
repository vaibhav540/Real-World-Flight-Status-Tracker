import React from "react";
import { Box, Flex, Text, Link, VStack, HStack, Icon } from "@chakra-ui/react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPlaneDeparture,
  FaEnvelope,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer: React.FC = () => {
  return (
    <Box
      bg="blue.600" // Same as Navbar
      color="white" // Same as Navbar
      py={8}
      minH="200px"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "center", md: "start" }}
        px={{ base: 4, md: 6, lg: 10 }}
      >
        {/* Company Info and Navigation Links - Hidden on small screens */}
        <Box display={{ base: "none", md: "block" }}>
          <VStack align="start" spacing={4} mb={{ base: 6, md: 0 }}>
            <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
              FlightApp
            </Text>
            <HStack spacing={4} wrap="wrap">
              <Link href="/">Home</Link>
              <Link href="/about">About Us</Link>
              <Link href="/flights">Flights</Link>
              <Link href="/support">Support</Link>
            </HStack>
          </VStack>
        </Box>

        {/* Social Media Links - Hidden on small screens */}
        <Box display={{ base: "none", md: "block" }}>
          <VStack align="start" spacing={4} mb={{ base: 6, md: 0 }}>
            <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
              Connect With Us
            </Text>
            <HStack spacing={4}>
              <Link href="https://www.facebook.com" isExternal>
                <Icon as={FaFacebookF} boxSize={5} />
              </Link>
              <Link href="https://www.twitter.com" isExternal>
                <Icon as={FaTwitter} boxSize={5} />
              </Link>
              <Link href="https://www.instagram.com" isExternal>
                <Icon as={FaInstagram} boxSize={5} />
              </Link>
              <Link href="https://www.linkedin.com" isExternal>
                <Icon as={FaLinkedinIn} boxSize={5} />
              </Link>
            </HStack>
          </VStack>
        </Box>

        {/* Contact Information - Always visible */}
        <VStack align={{ base: "center", md: "start" }} spacing={4}>
          <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
            Contact Us
          </Text>
          <HStack spacing={2}>
            <Icon as={FaEnvelope} />
            <Text textAlign="center">
              Email:{" "}
              <Link href="mailto:support@flightapp.com">
                support@flightTracker.com
              </Link>
            </Text>
          </HStack>
          <HStack spacing={2}>
            <Icon as={FaPlaneDeparture} />
            <Text textAlign="center">
              Call: <Link href="tel:+1234567890">+1 234 567 890</Link>
            </Text>
          </HStack>
        </VStack>
      </Flex>

      {/* Footer Bottom Text */}
      <Text textAlign="center" pt={4} fontSize="sm">
        &copy; {new Date().getFullYear()} FlightTracker. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
