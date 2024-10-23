import React, { useState } from "react";
import { Input, Button, Box } from "@chakra-ui/react";

interface SearchFlightProps {
  onSearch: (query: string) => void;
}

const SearchFlight: React.FC<SearchFlightProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Box>
      <Input
        placeholder="Enter Flight Number"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={handleSearch} colorScheme="blue" mt={2}>
        Search
      </Button>
    </Box>
  );
};

export default SearchFlight;

export {}; // Fix for --isolatedModules
