import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlateCard from "../PlateCard";
import TestWrapper from "./TestWrapper";

describe("PlateCard component", () => {
  it("renders children correctly", () => {
    render(
      <TestWrapper>
        <PlateCard>Hello World</PlateCard>
      </TestWrapper>
    );
    const childElement = screen.getByText("Hello World");
    expect(childElement).toBeInTheDocument();
  });

  it("displays menu when showOptions is true", () => {
    const options = [{ label: "Option 1", onClick: jest.fn() }];
    render(
      <TestWrapper>
        <PlateCard showOptions={true} options={options} />
      </TestWrapper>
    );
    const menuButton = screen.getByTestId("open-menu-button");
    fireEvent.click(menuButton);
    const menuItem = screen.getByText("Option 1");
    expect(menuItem).toBeInTheDocument();
  });

  it("executes onClick callback when menu item is clicked", () => {
    const onClickMock = jest.fn();
    const options = [{ label: "Option 1", onClick: onClickMock }];
    render(
      <TestWrapper>
        <PlateCard showOptions={true} options={options} />
      </TestWrapper>
    );
    const menuButton = screen.getByTestId("open-menu-button");
    fireEvent.click(menuButton);
    const menuItem = screen.getByText("Option 1");
    fireEvent.click(menuItem);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("does not display menu when showOptions is false", () => {
    render(
      <TestWrapper>
        <PlateCard showOptions={false} />
      </TestWrapper>
    );
    const menuButton = screen.queryByTestId("open-menu-button");
    expect(menuButton).not.toBeInTheDocument();
  });
});
