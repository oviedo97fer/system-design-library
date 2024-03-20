import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Typography from "../Typography";
import TestWrapper from "./TestWrapper";

describe("Typography component", () => {
  it("render text", () => {
    const { getByText } = render(
      <TestWrapper>
        <Typography text="Texto de prueba" />
      </TestWrapper>
    );
    expect(getByText("Texto de prueba")).toBeInTheDocument();
  });

  it("render text with start icon", () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Typography
          text="Test"
          icon={<div data-testid="icon" />}
          iconPosition="start"
        />
      </TestWrapper>
    );
    const icon = getByTestId("icon");
    expect(icon.parentNode?.firstChild).toBe(icon);
  });

  it("render text with end icon", () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Typography
          text="Texto de prueba"
          icon={<div data-testid="icon" />}
          iconPosition="end"
        />
      </TestWrapper>
    );
    const icon = getByTestId("icon");
    expect(icon.parentNode?.lastChild).toBe(icon);
  });
});
