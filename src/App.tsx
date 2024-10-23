import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyBookings from "./pages/MyBookings";
import FlightStatus from "./pages/FlightStatus";
import FlightDetail from "./pages/FlightDetail"; // New FlightDetail import
import LoginSignup from "./pages/LoginSignup";
import Support from "./pages/SupportPage";
import Navbar from "./components/Navbar"; // Import Navbar
import Footer from "./components/Footer"; // Import Footer
const App: React.FC = () => {
  return (
    <>
      <ChakraProvider>
        <Router>
          <Box minH="100vh">
            <Navbar /> {/* Navbar is always displayed */}
            <Box p={4}>
              <Routes>
                <Route path="/" element={<MyBookings />} />
                <Route path="/flight-status" element={<FlightStatus />} />
                <Route
                  path="/flight-detail/:flightNumber"
                  element={<FlightDetail />} // Dynamic route
                />
                <Route path="/login" element={<LoginSignup />} />
                <Route path="/support" element={<Support />} />
              </Routes>
            </Box>
          </Box>
        </Router>
        <Footer /> {/* Footer is displayed at the bottom of the page */}
      </ChakraProvider>
    </>
  );
};

export default App;
