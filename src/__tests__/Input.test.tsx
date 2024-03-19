import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "../Input";
import TestWrapper from "./TestWrapper";

describe("Input component", () => {
  it("debería renderizar correctamente el componente", () => {
    render(
      <TestWrapper>
        <Input />
      </TestWrapper>
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("must render label", () => {
    const label = "label de prueba";
    render(
      <TestWrapper>
        <Input label={label} />
      </TestWrapper>
    );
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
