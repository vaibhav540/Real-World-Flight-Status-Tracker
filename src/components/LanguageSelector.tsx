import { Box, Select } from "@chakra-ui/react";
import { useState } from "react";

const LanguageSelector = () => {
  const [language, setLanguage] = useState("English");

  return (
    <Box p="6">
      <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="English">English</option>
        <option value="Hindi">Hindi</option>
      </Select>
    </Box>
  );
};

export default LanguageSelector;
