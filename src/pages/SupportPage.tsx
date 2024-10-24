import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useBreakpointValue,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";

const Support: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const toast = useToast();

  // Form input change handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Reset errors and start loading
    setErrors({});
    setIsLoading(true);

    try {
      // Mock submission (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Support request submitted!",
        description: "Our team will get back to you shortly.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Clear form data
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Error submitting request",
        description:
          "There was an error processing your request. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <Box
        p={6}
        maxW="lg"
        mx="auto"
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        mt={8}
      >
        <Heading
          as="h2"
          size={useBreakpointValue({ base: "lg", md: "xl" })}
          mb={4}
        >
          Need Support?
        </Heading>
        <Text mb={4}>
          If you encounter any issues or have questions about your bookings,
          please reach out to our support team. We are here to help you!
        </Text>

        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          <FormControl isRequired isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Your Name</FormLabel>
            <Input
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && (
              <Text color="red.500" fontSize="sm">
                {errors.name}
              </Text>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Your Email</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <Text color="red.500" fontSize="sm">
                {errors.email}
              </Text>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.message}>
            <FormLabel htmlFor="message">Message</FormLabel>
            <Textarea
              id="message"
              placeholder="Describe your issue or question"
              value={formData.message}
              onChange={handleInputChange}
            />
            {errors.message && (
              <Text color="red.500" fontSize="sm">
                {errors.message}
              </Text>
            )}
          </FormControl>

          <Button
            colorScheme="teal"
            type="submit"
            width="fit-content"
            isDisabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : "Submit Request"}
          </Button>
        </VStack>

        <Box mt={6}>
          <Text fontSize="sm" color="gray.600">
            For immediate assistance, you can also contact us at
            <Text as="span" fontWeight="bold">
              {" "}
              support@flightTracker.com
            </Text>
            .
          </Text>
        </Box>
      </Box>
    </div>
  );
};

export default Support;
