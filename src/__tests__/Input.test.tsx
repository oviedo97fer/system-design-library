import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "../Input";
import TestWrapper from "./TestWrapper";

describe("Input component", () => {
  it("must render component", () => {
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
  it("should toggle password visibility when clicking the visibility icon", () => {
    render(
      <TestWrapper>
        <Input isPassword label="password" id="test" />
      </TestWrapper>
    );

    const input = screen.getByLabelText("password");
    const visibilityIcon = screen.getByTestId("input-adornment");

    expect(input).toHaveAttribute("type", "password");

    fireEvent.click(visibilityIcon);

    waitFor(() => {
      expect(input).toHaveAttribute("type", "text");
    }).then(() => {
      fireEvent.click(visibilityIcon);
      waitFor(() => {
        expect(input).toHaveAttribute("type", "password");
      });
    });
  });
  it("should have correct type when isPassword prop is false", () => {
    render(
      <TestWrapper>
        <Input isPassword={false} />
      </TestWrapper>
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "text");
  });

  it("should have correct type when type prop is provided", () => {
    const type = "email";
    render(
      <TestWrapper>
        <Input type={type} />
      </TestWrapper>
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", type);
  });
});
