import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Typography from "../Typography";
import TestWrapper from "./TestWrapper";

describe("Typography component", () => {
  it("debería renderizar el texto correctamente", () => {
    const { getByText } = render(
      <TestWrapper>
        <Typography text="Texto de prueba" />
      </TestWrapper>
    );
    expect(getByText("Texto de prueba")).toBeInTheDocument();
  });

  it('debería renderizar el icono antes del texto si iconPosition es "start"', () => {
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

  it('debería renderizar el icono después del texto si iconPosition es "end"', () => {
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
