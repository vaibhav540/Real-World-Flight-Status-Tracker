import axios from "axios";
import { Flight } from "../types";

const API_URL = "https://flight-status-mock.core.travelopia.cloud/flights";

// Custom error classes to improve error reporting
class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

class FlightNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FlightNotFoundError";
  }
}

// Fetch all flights
export const fetchFlights = async (): Promise<Flight[]> => {
  try {
    const response = await axios.get(API_URL);

    // Validate response structure
    if (!Array.isArray(response.data)) {
      throw new Error("Invalid response format: Expected an array of flights");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle network or server errors
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error(
          `Server Error: ${error.response.status} - ${error.response.statusText}`
        );
      } else if (error.request) {
        // No response received from the server
        console.error("Network Error: No response received from the server");
        throw new NetworkError(
          "Unable to reach the server. Please try again later."
        );
      }
    } else {
      // Other unexpected errors
      console.error("Unexpected Error:", error);
    }

    throw new Error(
      "An error occurred while fetching flights. Please try again."
    );
  }
};

// Fetch a specific flight by its flight number
export const fetchFlightByNumber = async (
  flightNumber: string
): Promise<Flight> => {
  try {
    const response = await axios.get(`${API_URL}?flightNumber=${flightNumber}`);

    if (!Array.isArray(response.data) || response.data.length === 0) {
      throw new FlightNotFoundError(
        `No flight found with the number: ${flightNumber}`
      );
    }

    return response.data[0]; // Return the first matching flight
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle network or server errors
      if (error.response) {
        console.error(
          `Server Error: ${error.response.status} - ${error.response.statusText}`
        );
      } else if (error.request) {
        console.error("Network Error: No response received from the server");
        throw new NetworkError(
          "Unable to reach the server. Please try again later."
        );
      }
    } else if (error instanceof FlightNotFoundError) {
      // Handle custom FlightNotFoundError
      console.error(error.message);
    } else {
      // Other unexpected errors
      console.error("Unexpected Error:", error);
    }

    throw new Error(
      `An error occurred while fetching flight number ${flightNumber}. Please try again.`
    );
  }
};
