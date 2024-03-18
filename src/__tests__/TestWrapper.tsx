import React, { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../stylesheet";

interface TestWrapperProps {
  children: ReactNode;
}

const TestWrapper: React.FC<TestWrapperProps> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default TestWrapper;
