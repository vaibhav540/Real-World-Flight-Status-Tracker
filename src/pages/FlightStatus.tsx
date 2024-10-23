import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import FlightTable from "../components/FlightTable";
import SearchFlight from "../components/SearchFlight";
import { useFlightStatus } from "../hooks/useFlightStatus";
import "bootstrap/dist/css/bootstrap.min.css";

const FlightStatus: React.FC = () => {
  const flights = useFlightStatus();

  const handleSearch = (query: string) => {
    console.log("Searching for flight:", query);
  };

  return (
    <div className="container-fluid">
      <Box p={6}>
        <Heading mb={6}>Flight Status</Heading>
        <SearchFlight onSearch={handleSearch} />
        <FlightTable flights={flights} />
      </Box>
    </div>
  );
};

export default FlightStatus;
