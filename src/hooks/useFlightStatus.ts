import { useState, useEffect } from "react";
import { fetchFlights } from "../services/flightService";
import { Flight } from "../types";

export const useFlightStatus = () => {
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const flightData = await fetchFlights();
      setFlights(flightData);
    };

    fetchData();

    const interval = setInterval(fetchData, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return flights;
};

export {}; // Fix for --isolatedModules
