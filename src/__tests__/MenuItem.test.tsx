import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import MenuItem from "../MenuItem";
import TestWrapper from "./TestWrapper";
import { theme } from "../stylesheet";

describe("MenuItem component", () => {
  it("renders without crashing", () => {
    render(
      <TestWrapper>
        <MenuItem />
      </TestWrapper>
    );
  });

  it("renders text correctly", () => {
    const { getByText } = render(
      <TestWrapper>
        <MenuItem text="Example Text" />
      </TestWrapper>
    );
    expect(getByText("Example Text")).toBeInTheDocument();
  });

  it("renders icon correctly", () => {
    const icon = <div className="icon">Icon</div>;
    const { getByText } = render(
      <TestWrapper>
        <MenuItem icon={icon} />
      </TestWrapper>
    );
    expect(getByText("Icon")).toBeInTheDocument();
  });

  it("applies border when withBorder prop is true", () => {
    const { container } = render(
      <TestWrapper>
        <MenuItem withBorder />
      </TestWrapper>
    );
    const menuItem = container.firstChild;
    expect(menuItem).toHaveStyle(
      `border: 1px solid ${theme.palette.text.disabled}`
    );
  });

  it("applies primary background when selected", () => {
    const { container } = render(
      <TestWrapper>
        <MenuItem selected />
      </TestWrapper>
    );
    const menuItem = container.firstChild;
    expect(menuItem).toHaveStyle(`background: ${theme.palette.primary.main}`);
  });
});
