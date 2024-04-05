import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlateCard from "../PlateCard";
import TestWrapper from "./TestWrapper";

describe("PlateCard component", () => {
  test("renders children correctly", () => {
    render(
      <TestWrapper>
        <PlateCard view="create" onDelete={() => ""}>
          Test Children
        </PlateCard>
      </TestWrapper>
    );
    const childrenElement = screen.getByText("Test Children");
    expect(childrenElement).toBeInTheDocument();
  });

  it('changes view to edit when "Edit" menu item is clicked', () => {
    const { getByText, getByTestId, queryByText } = render(
      <TestWrapper>
        <PlateCard view="resume" onDelete={() => {}}>
          <div>Hello World</div>
        </PlateCard>
      </TestWrapper>
    );

    fireEvent.click(getByTestId("open-menu-button"));

    expect(queryByText("Edit")).toBeInTheDocument();

    fireEvent.click(getByText("Edit"));

    expect(queryByText("Hello World")).toBeInTheDocument();
  });

  it("triggers onDelete function when delete button is clicked", () => {
    const onDeleteMock = jest.fn();
    const { getByText, getByTestId } = render(
      <TestWrapper>
        <PlateCard view="resume" onDelete={onDeleteMock}>
          <div>Hello World</div>
        </PlateCard>
      </TestWrapper>
    );

    fireEvent.click(getByTestId("open-menu-button"));

    expect(getByText("Delete")).toBeInTheDocument();

    fireEvent.click(getByText("Delete"));

    expect(onDeleteMock).toHaveBeenCalled();
  });
});
