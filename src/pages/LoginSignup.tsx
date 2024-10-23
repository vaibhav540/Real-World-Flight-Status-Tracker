import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginSignup: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for actual authentication logic
    toast({
      title: isLogin ? "Logged In!" : "Account Created!",
      description: `Welcome, ${email}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <div className="container-fluid">
      <Box p="6" maxW="md" mx="auto" borderWidth={1} borderRadius="lg">
        <Heading as="h2" size="lg" mb={4} textAlign="center">
          {isLogin ? "Login" : "Sign Up"}
        </Heading>

        <Tabs variant="soft-rounded" colorScheme="teal">
          <TabList>
            <Tab onClick={() => setIsLogin(true)}>Login</Tab>
            <Tab onClick={() => setIsLogin(false)}>Sign Up</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                  </FormControl>
                  <Button type="submit" colorScheme="teal">
                    Login
                  </Button>
                </Stack>
              </form>
            </TabPanel>

            <TabPanel>
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                    />
                  </FormControl>
                  <Button type="submit" colorScheme="teal">
                    Sign Up
                  </Button>
                </Stack>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
};

export default LoginSignup;
