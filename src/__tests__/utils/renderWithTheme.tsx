import React, { ReactNode } from "react";
import { render as rtlRender } from "@testing-library/react";
import { theme } from "../../stylesheet";
import { ThemeProvider } from "@mui/material/styles";

interface CustomRenderOptions {
  wrapper?: React.ComponentType<{ children?: ReactNode }> | ReactNode;
}

function customRender(ui: React.ReactElement, options?: CustomRenderOptions) {
  const { wrapper, ...restOptions } = options || {};
  const Wrapper: React.FC<{ children?: ReactNode }> = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );

  return rtlRender(ui, {
    wrapper: wrapper ? Wrapper : undefined,
    ...restOptions,
  });
}

export * from "@testing-library/react";
export { customRender as render };
